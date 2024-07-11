#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(non_snake_case)]

use serde::ser::{Serialize, SerializeStruct, Serializer};
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

    // result data
    Pfric: f64, // frictional pressure drop [Kgf/cm^2/100m]
    Ef: f64,    // Erosion Factor [-]
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
            Pfric: 0.0,
            Ef: 0.0,
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

    pub fn model_cal(&mut self) {
        self.flow_regime();
        if self.flow_regime == "Vertical Up Annular Flow" {
            self.SimilarityAnalysis();
        }
        if self.flow_regime == "Vertical Up Slug and Churn Flow" {
            self.SlugModel();
        }
        if self.flow_regime == "Vertical Up Bubble Flow" {
            self.BubbleModel();
        }
        if self.flow_regime == "Vertical Up Finely Dispersed Bubble Flow" {
            self.BubbleModel();
        }
    }

    fn fanning(&self, Re: f64) -> f64 {
        // by Chen (1979)
        if Re < 2100.0 {
            16.0 / Re
        } else {
            let a = (self.rough / self.ID).powf(1.1098) / 2.8257 + (7.149 / Re).powf(0.8961);
            let b = -4.0 * ((self.rough / self.ID / 3.7065) - (5.0452 / Re) * (a.log10())).log10();
            1.0 / b.powf(2.0)
        }
    }

    fn SimilarityAnalysis(&mut self) {
        // for Anaular flow pattern
        use std::f64;
        let area = f64::consts::PI * self.ID * self.ID / 4.0; // pipe area [m^2]
        let Gt = (self.WL + self.WG) / area / 3600.0; // Eq (22)

        let UGS = self.WG / self.LoG / area / 3600.0; // Vapor Velocity [m/s]
        let ULS = self.WL / self.LoL / area / 3600.0; // Liquid Velocity [m/s]
        let UTP = UGS + ULS; // Two Phase Velocity [m/s], Eq (23)

        let lamda = ULS / (ULS + UGS); // Liquid Volume Fraction [-], Eq (24)
        let mut Rgi = 0.5; // Gas Hold-up (Rg) initial value [-]
        let eps = 1e-4; // allowable tolerance
        let np = 100; // trial number
        let i = 0; // loop counter

        for i in 0..np {
            // (5) Calc. Re and Fr
            let Re = self.ID * Gt / (Rgi * self.muG + (1.0 - Rgi) * self.muL); // Eq. (25)
            let Fr = UTP * UTP / (G * self.ID); // Froude Number, Eq. (26)

            // (6) Calc. Z and K
            let Z = Re.powf(0.167) * Fr.powf(0.125) / lamda.powf(0.25); // Eq.(27)
            let K;
            if Z < 10.0 {
                K = -0.16367 + 0.31037 * Z - 0.03525 * Z * Z + 0.001366 * Z * Z * Z;
            } else {
                K = 0.75545 + 0.003585 * Z - 0.1436e-4 * Z * Z;
            }

            // (7) Calc Rg (cal.)
            let x = self.WG / (self.WG + self.WL);
            let Rgcal = K / ((1.0 / x - 1.0) * (self.LoG / self.LoL) + 1.0); // Eq. (28)

            // (8) Calc delta and judgement convergence condition
            let delta = (Rgcal - Rgi).abs();
            if delta > eps {
                Rgi = (Rgcal + Rgi) / 2.0;
                // Repeat calc (5), (6), (7)
            } else {
                break;
            }
        }

        let Rg;
        if i < np {
            Rg = Rgi; // certain Rg
        } else {
            return;
        }

        // Calculate Result
        let RL = 1.0 - Rg;
        let LoTP =
            self.LoL * lamda.powf(2.0) / (1.0 - Rg) + self.LoG * (1.0 - lamda).powf(2.0) / Rg; // Eq. (29)
        let muTP = self.muL * lamda + self.muG * (1.0 - lamda);
        let ReTP = self.ID * (ULS + UGS) * LoTP / muTP; // Eq. (30)
        let f0 = self.fanning(ReTP) * 4.0;
        let LnLanda = -1.0 * lamda.ln();
        let fTP = (1.0
            + LnLanda
                / (1.281 - 0.478 * LnLanda + 0.444 * LnLanda.powf(2.0)
                    - 0.094 * LnLanda.powf(3.0)
                    + 0.00843 * LnLanda.powf(4.0)))
            * f0; // Eq. (31)

        self.Pfric =
            fTP * LoTP * (ULS + UGS).powf(2.0) / (2.0 * G * self.ID) / 10000.0 * 100.0 * self.SF; // Eq. (32)
        let Pgrav = (self.LoL * (1.0 - Rg) + self.LoG * Rg) / 10000.0 * 100.0; // Eq. (33)
        let Loip = self.LoL * (1.0 - Rg) + self.LoG * Rg;
        let LoNS = (self.WL + self.WG) / (self.WL / self.LoL + self.WG / self.LoG);
        let Head = LoNS * UTP.powf(2.0) / (2.0 * G) / 10000.0;
        self.Ef = (LoNS * 0.062428) * ((ULS + UGS) * 3.28084).powf(2.0) / 10000.0;
    }

    fn SlugModel(&mut self) {
        // for Slug and Churn flow pattern
        use std::f64;

        let area = f64::consts::PI * self.ID * self.ID / 4.0; // pipe area [m^2]
        let UGS = self.WG / self.LoG / area / 3600.0; // Vapor Velocity [m/s]
        let ULS = self.WL / self.LoL / area / 3600.0; // Liquid Velocity [m/s]
        let UTP = UGS + ULS; // Two Phase Velocity [m/s]

        let alfaLS = 0.25; // Void fraction of liquid slug
        let UN = 0.35 * (G * self.ID).sqrt() + 1.29 * UTP; // rise velocity of transition of Taylor Bubble in stagnant liquid [m/s], Eq. (A-16)

        // term = UO : the rise velocity due to buoyancy [m/s], Eq. (A-18)
        let mut term;
        term = 1.53
            * ((self.ST * G * (self.LoL - self.LoG)) / (self.LoL * self.LoL)).powf(0.25)
            * (1.0f64 - alfaLS).sqrt();
        let ULLS = UTP - term * alfaLS; // Velocity of the liquid in the liquid slug
        let UGLS = UTP + term * (1.0 - alfaLS); // Velocity of the gas in the liquid slug
        let Landa = ULLS * (1.0 - alfaLS) / UTP; // Liquid volume fraction [-]
        let mut alfaTB = 0.1; // Void fraction of Taylor Bubble [-]
        let mut delta = 1.0; // absolute error
        let eps = 1e-4; // allowable tolerance

        let mut term1;
        let mut alf1;
        let mut alf2;
        let mut alfaTB_cal;

        while delta > eps {
            term = UN * (alfaTB - alfaLS) - ULLS * (1.0 - alfaLS);
            term1 = 9.916 * (G * self.ID * (1.0 - alfaTB.sqrt())).sqrt() * (1.0 - alfaTB);
            alf1 = term - term1;
            alf2 = UN
                + 9.916
                    * (G * self.ID * (1.0 - alfaTB.sqrt())).sqrt()
                    * (1.0 + 5.0 * alfaTB.sqrt())
                    / (4.0 * alfaTB.sqrt());
            if alf2 == 0.0 {
                break;
            }
            alfaTB_cal = alfaTB - alf1 / alf2; // Calc. Void fraction of Taylor Bubble [-]
            delta = (alfaTB_cal - alfaTB).abs();
            alfaTB = (alfaTB + alfaTB_cal) / 2.0;
        }

        let ULTB = 9.916 * (G * self.ID * (1.0 - alfaTB.sqrt())).sqrt();
        let beta = (UGS - alfaLS * UGLS) / UN / (alfaTB - alfaLS); // LTB/Lu
        let alfaSU = beta * alfaTB + (1.0 - beta) * alfaLS; // void fraction of a slug unit
        let LLS = 20.0 * self.ID;
        let Lu = LLS / (1.0 - beta);
        let LTB = Lu - LLS; // length of Taylor Bubble
        let LoLS = self.LoG * (1.0 - Landa).powf(2.0) / alfaLS
            + self.LoL * Landa.powf(2.0) / (1.0 - alfaLS);
        let LoSU = self.LoG * (1.0 - alfaSU) + self.LoL * alfaSU;
        let Le = self.ID * 35.5 * (8.0 / 7.0 * UTP / (G * self.ID).sqrt() + 0.25) * 1.2;

        let LoNS = (self.WL + self.WG) / (self.WL / self.LoL + self.WG / self.LoG); // no-slip density [Kg/m^3]
        let Head = LoNS * UTP.powf(2.0) / (2.0 * G) / 10000.0;
        let LoTP = LoLS;
        let muTP = self.muL * Landa + self.muG * (1.0 - Landa);
        let ReTP = LoTP * UTP * self.ID / muTP;
        let f0 = self.fanning(ReTP) * 4.0;
        let LnLanda = -1.0 * Landa.ln();
        let fTP = f0
            * (1.0
                + LnLanda
                    / (1.281 - 0.478 * LnLanda + 0.444 * LnLanda.powf(2.0)
                        - 0.094 * LnLanda.powf(3.0)
                        + 0.00843 * LnLanda.powf(4.0)));

        self.Pfric = fTP * LoTP * ULLS.powf(2.0) / (2.0 * G * self.ID) * (LLS / Lu) / 10000.0
            * 100.0
            * self.SF;
        let Pacc =
            self.LoL * ULTB / G * (1.0 - alfaTB) * (ULLS + ULTB) * (1.0 / Lu) / 10000.0 * 100.0;
        self.Pfric = self.Pfric + Pacc;
        let Pgrav = (self.LoL * (1.0 - alfaSU) + self.LoG * alfaSU) / 10000.0 * 100.0;
        self.Ef = (LoNS * 0.062428) * ((ULS + UGS) * 3.28084).powf(2.0) / 10000.0;
        // must transfer to imperial unit
    }

    fn BubbleModel(&mut self) {
        // for Bubble flow and Finely Bubble flow pattern
        use std::f64;

        let area = f64::consts::PI * self.ID * self.ID / 4.0; // pipe area [m^2]
        let UGS = self.WG / self.LoG / area / 3600.0; // Vapor Velocity [m/s]
        let ULS = self.WL / self.LoL / area / 3600.0; // Liquid Velocity [m/s]
        let Landa = ULS / (ULS + UGS); // Liquid Volume Fraction [-]
        let mut delta = 1.0; // Absolute error [-]
        let mut alfa = 0.5; // Gas average void fraction [-]
        let eps = 1e-4; // Allowable Tolerance
        let mut n = 0; // trials
        const MAX_TRIAL: i32 = 100;

        while delta > eps {
            let U0 = (1.0f64 - alfa).sqrt()
                * 1.53
                * ((self.ST * G * (self.LoL - self.LoG)) / (self.LoL * self.LoL)).powf(0.25); // Eq. (38)
            let alfacal = UGS / (ULS / (1.0 - alfa) + U0); // Eq. (37)
            delta = (alfacal - alfa).abs();
            alfa = (alfa + alfacal) / 2.0;
            n += 1;
            if n > MAX_TRIAL {
                break;
            }
        }

        if n > MAX_TRIAL {
            println!("Vertical-Up Bubble Model: alfa did not converge!");
        }

        // calculate result here
        let loTP =
            self.LoG * (1.0 - Landa).powf(2.0) / alfa + self.LoL * Landa.powf(2.0) / (1.0 - alfa); // Eq. (40)
        let muTP = self.muL * Landa + self.muG * (1.0 - Landa); // Eq. (40)
        let ReTP = self.ID * (ULS + UGS) * loTP / muTP; // Eq. (41)
        let f0 = self.fanning(ReTP) * 4.0; // Step (3)
        let lnlanda = -1.0 * Landa.ln();
        let fTP = f0
            * (1.0
                + lnlanda
                    / (1.281 - 0.478 * lnlanda + 0.444 * lnlanda.powf(2.0)
                        - 0.094 * lnlanda.powf(3.0)
                        + 0.00843 * lnlanda.powf(4.0))); // Step (4)
        self.Pfric =
            fTP * loTP * (ULS + UGS).powf(2.0) / (2.0 * G * self.ID) / 10000.0 * 100.0 * self.SF; // Eq. (42)
        let Pgrav = (self.LoL * (1.0 - alfa) + self.LoG * alfa) / 10000.0 * 100.0; // Eq. (43)
        let UTP = ULS + UGS;
        let LoNS = self.LoL * Landa + self.LoG * (1.0 - Landa);
        let Head = LoNS * UTP.powf(2.0) / (2.0 * G) / 10000.0;
        self.Ef = (LoNS * 0.062428) * (UTP * 3.28084).powf(2.0) / 10000.0;
        // must transfer to imperial unit
    }
}

impl Serialize for VerticalUp {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("VerticalUp", 14)?;
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
        state.serialize_field("Pfric", &self.Pfric)?;
        state.serialize_field("Ef", &self.Ef)?;
        state.end()
    }
}
