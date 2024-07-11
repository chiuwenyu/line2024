#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(non_snake_case)]

// 檔案的其他內容

use serde::ser::{Serialize, SerializeStruct, Serializer};

use std::f32::consts::PI;
use std::f64;

const G: f64 = 9.81; // gravity accelerator [,/s^2]
const GC: f64 = 9.8; // gravity constant [kg-m/kgf-s^2]

pub struct VerticalUp {
    // process data
    WL: f64,    // liquid mass flow rate [kg/hr]
    WG: f64,    // Vapor mass flow rate [kg/hr]
    LoL: f64,   // liquid density [kg/m^3]
    LoG: f64,   // vapor density [kg/m^3]
    muL: f64,   // liquid viscosity [Pa-s]
    muG: f64,   // vapor viscosity [Pa-s]
    ST: f64,    // surface tension [N/m]
    rough: f64, // pipe roughness [m]
    SF: f64,    // safety factor
    ID: f64,    // pipe diameter [m]
    degree: f64,

    // regime data
    flow_regime: String,
}

impl VerticalUp {
    pub fn new(
        wl: f64,
        wg: f64,
        lol: f64,
        logg: f64,
        mul: f64,
        mug: f64,
        st: f64,
        rough: f64,
        sf: f64,
        id: f64,
        degree: f64,
    ) -> Self {
        VerticalUp {
            WL: wl,
            WG: wg,
            LoL: lol,
            LoG: logg,
            muL: mul * 0.001,        // [cP] -> [kg/m-s]
            muG: mug * 0.001,        // [cP] -> [kg/m-s]
            ST: st * 1.019716213E-4, // [dyne/cm] -> [kgf/s^2]
            rough: rough / 1000.0,   // [mm] -> [m]
            SF: sf,
            ID: id * 2.54 / 100.0,                    // [in] -> [m]
            degree: degree * f64::consts::PI / 180.0, // [degree] -> [rad]
            flow_regime: String::from(""),
        }
    }

    fn get_UGSE_from_curveE(&self) -> f64 {
        // Refer to Eq. (21)
        let term_e = ((self.LoL - self.LoG) * G * self.ST).powf(0.25);
        let UGS_cal = 3.1 * term_e / self.LoG.sqrt(); // Curve E 求得的 UGS 計算值 (Curve E 與 ULS 無關)
        UGS_cal
    }

    fn get_ULSB_from_curveB(&self, x: f64) -> f64 {
        // by Eq. (12)
        let term_b = 4.0
            * ((G * (self.LoL - self.LoG) / self.LoL).powf(0.446)
                * self.ID.powf(0.429)
                * (self.ST / self.LoL).powf(0.089)
                / (self.muL / self.LoL).powf(0.072));
        let ULS_cal = term_b - x;
        ULS_cal
    }

    fn get_UGSA_from_curveA(&self, y: f64) -> Result<f64, &'static str> {
        // by Eq. (5)
        let term_a = G * (self.LoL - self.LoG) * self.ST / self.LoL.powf(2.0);
        let UGS_cal = (y + 0.9938 * term_a.powf(0.25)) / 3.0;

        if UGS_cal.is_nan() || UGS_cal.is_infinite() {
            Err("VerticalUp-DT Curve A: ArithmeticException")
        } else {
            Ok(UGS_cal)
        }
    }

    pub fn flow_regime(&mut self) {
        let alfa = 0.25; // Average Gas Void Fraction
        let area = std::f64::consts::PI * self.ID * self.ID / 4.0; // pipe area [m^2]
        let UG = self.WG / self.LoG / area / 3600.0; // Vapor Velocity [m/s]
        let UL = self.WL / self.LoL / area / 3600.0; // Liquid Velocity [m/s]
        let UGS = UG * alfa; // Vapor Superficial Velocity [m/s]
        let ULS = UL * (1.0 - alfa); // Liquid Superficial Velocity [m/s]

        // Curve E
        let ratio_e = UGS / self.get_UGSE_from_curveE();

        // Curve C
        let ratio_c = UGS / (13.0 / 12.0 * ULS); // Curve C Eq. (15) 求得的 UGS 計算值

        // Curve B
        let ratio_b = ULS / self.get_ULSB_from_curveB(UGS);

        // Curve A ()
        let mut ratio_a: f64 = 0.0;
        match self.get_UGSA_from_curveA(ULS) {
            Ok(value) => {
                ratio_a = UGS / value;
            }
            Err(e) => {
                println!("Error: {}", e);
            }
        }
        // ***** Regime 的判斷邏輯 *****
        if ratio_e > 1.0 {
            // Churn transition to Annular Flow 與流體速度無關, 與管徑亦無任何關聯
            // ratioE > 1 : Annular Flow
            // ratioE <= 1 : Churn Flow
            self.flow_regime = String::from("Vertical Up Annular Flow");
        } else if ratio_a <= 1.0 && ratio_b <= 1.0 {
            self.flow_regime = String::from("Vertical Up Bubble Flow");
        } else if ratio_a > 1.0 && ratio_b <= 1.0 {
            self.flow_regime = String::from("Vertical Up Slug and Churn Flow");
        } else if ratio_a > 1.0 && ratio_c > 1.0 {
            self.flow_regime = String::from("Vertical Up Slug and Churn Flow");
        } else {
            self.flow_regime = String::from("Vertical Up Finely Dispersed Bubble Flow");
        };
    }
}

impl Serialize for VerticalUp {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("VerticalUp", 12)?;
        state.serialize_field("wl", &self.WL)?;
        state.serialize_field("wg", &self.WG)?;
        state.serialize_field("lol", &self.LoL)?;
        state.serialize_field("logg", &self.LoG)?;
        state.serialize_field("mul", &self.muL)?;
        state.serialize_field("mug", &self.muG)?;
        state.serialize_field("st", &self.ST)?;
        state.serialize_field("rough", &self.rough)?;
        state.serialize_field("sf", &self.SF)?;
        state.serialize_field("id", &self.ID)?;
        state.serialize_field("degree", &self.degree)?;
        state.serialize_field("flow_regime", &self.flow_regime)?;
        state.end()
    }
}
