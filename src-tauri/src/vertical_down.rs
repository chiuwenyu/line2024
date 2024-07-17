#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(non_snake_case)]

use serde::ser::{Serialize, SerializeStruct, Serializer};
use std::f64;
const G: f64 = 9.81; // gravity accelerator [,/s^2]
const GC: f64 = 9.8; // gravity constant [kg-m/kgf-s^2]

pub struct VerticalDown {
    // process data
    WL: f64,     // liquid mass flow rate [kg/hr]
    WG: f64,     // Vapor mass flow rate [kg/hr]
    LoL: f64,    // Liquid density [kg/m^3]
    LoG: f64,    // Vapor density [kg/m^3]
    muL: f64,    // Liquid viscosity [cP] -> [kg/m-s]
    muG: f64,    // Vapor viscosity [cP] -> [kg/m-s]
    ST: f64,     // Liquid surface tension [dyne/cm] -> [kg/s^2]
    rough: f64,  // pipe absolute roughness [mm] -> [m]
    SF: f64,     // Safety factor [-]
    ID: f64,     // pipe inside diameter [in] -> [m]
    degree: f64, // degree,  Horizontal = 0, -Up / +Down

    // result
    pub flow_regime: String, // identify the flow regime(String)

    // for Annular Model
    pub Pfric: f64, // Frictional pressure loss (kgf/cm^2/100m]
    pub Ef: f64,    // Erosion Factor [-]
}

impl crate::vertical_down::VerticalDown {
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
        crate::vertical_down::VerticalDown {
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

    fn get_uyc_from_curve_c(&self, x: f64) -> f64 {
        let area = std::f64::consts::PI * self.ID * self.ID / 4.0; // pipe area [m^2]
        let UL = self.WL / self.LoL / area / 3600.0; // Liquid Velocity [m/s]

        let term1 = 2.0 * (0.4 * self.ST / (self.LoL - self.LoG) / G).sqrt();
        let term2 = (self.LoL / self.ST).powf(0.6);
        let CL = 0.046;
        let n = 0.2; // Friction Factor parameter by Eq (11)
        let nuL = self.muL / self.LoL; // Liquid Kinetic Viscosity [m^2/s]
        let term3 = (2.0 / self.ID * CL * (self.ID / nuL).powf(-n)).powf(0.4);
        let term_b = term1 * term2 * term3;

        // Iterative method to find UM
        let mut UMi = UL + x; // initial value
        let trials = 100; // trial number
        let eps = 1e-6; // allowable tolerance
        let mut UMcal = 0.0; // reset calc value

        let mut i = 0;
        while i < trials {
            i += 1;
            let rt = 0.725 + 4.15 * (x / UMi).sqrt();
            let power = 2.0 * (3.0 - n) / 5.0;
            UMcal = (rt / term_b).powf(1.0 / power);
            let delta = (UMcal - UMi).abs();
            if delta > eps {
                UMi = UMcal;
            } else {
                break;
            }
        }

        let ULScal; // Curve B calculated ULS value
        if i < trials {
            ULScal = UMcal - x; // Convergence
        } else {
            ULScal = 0.0; // Divergence
        }

        ULScal
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

    fn AnnularModel(&mut self) {
        let area = std::f64::consts::PI / 4.0 * self.ID * self.ID; // pipe inside cross section area [m^2]
        let UGS = self.WG / (self.LoG * area) / 3600.0; // Superficial Vapor velocity [m/s]
        let ULS = self.WL / (self.LoL * area) / 3600.0; // Superficial Liquid velocity [m/s]

        // Assuming Fanning is a function that you have defined elsewhere
        let fSL = self.fanning(self.LoL * ULS * self.ID / self.muL); // Fanning friction factor for Liquid Phase only in pipe [-]
        let fSG = self.fanning(self.LoG * UGS * self.ID / self.muG); // Fanning friction factor for Vapor Phase only in pipe [-]

        let X2 = fSL * self.LoL * ULS.powi(2) / (fSG * self.LoG * UGS.powi(2)); // Martinelli parameter [-]
        let Y = G * (self.LoL - self.LoG) / (4.0 * fSG * self.LoG * UGS.powi(2) / (2.0 * self.ID)); // Martinelli parameter [-]

        let mut alfaL: f64 = 0.5; // initial value for Liquid Hold-Up [-]
        let mut delta: f64; // absolute error [-]
        let eps = 1e-4; // allowable tolerance [-]
        let mut gx; // Liquid Holdup function eq.(29)
        let mut gpx; // 1st order derivated function
        let mut alfaLcal: f64; // alfaL (cal.) [-]

        loop {
            gx = X2 * (1.0 - alfaL).powf(2.5)
                - alfaL.powf(2.0)
                - 75.0 * alfaL.powf(3.0)
                - Y * (1.0 - alfaL).powf(2.5) * alfaL.powf(3.0);

            gpx = -2.5 * X2 * (1.0 - alfaL).powf(1.5)
                - 2.0 * alfaL
                - 225.0 * alfaL.powf(2.0)
                - 3.0 * Y * (1.0 - alfaL).powf(2.5) * alfaL.powf(2.0)
                + 2.5 * Y * (1.0 - alfaL).powf(1.5) * alfaL.powf(3.0);

            alfaLcal = alfaL - gx / gpx;
            let delta = (alfaL - alfaLcal).abs();
            alfaL = alfaLcal;

            if delta <= eps {
                break;
            }
        }
        let Pfric = 2.0 * fSG * self.LoG * UGS.powi(2) / (G * self.ID) * (1.0 + 75.0 * alfaL)
            / (1.0 - alfaL).powf(2.5)
            / 10000.0
            * 100.0
            * self.SF;
        let Pgrav = self.LoG / 10000.0 * 100.0;
        let LoTP = self.LoL * alfaL + self.LoG * (1.0 - alfaL);
        let UTP = UGS + ULS;
        let LoNS = (self.WL + self.WG) / (self.WL / self.LoL + self.WG / self.LoG);
        let Head = LoNS * UTP.powi(2) / (2.0 * G) / 10000.0;
        let Ef = (LoNS * 0.062428) * (UTP * 3.28084).powi(2) / 10000.0; // must transfer to imperial unit
        self.Pfric = Pfric;
        self.Ef = Ef;
    }

    fn SlugModel(&mut self) {
        let area = std::f64::consts::PI / 4.0 * self.ID * self.ID; // pipe inside cross section area [m^2]
        let UGS = self.WG / (self.LoG * area) / 3600.0; // Superficial Vapor velocity [m/s]
        let ULS = self.WL / (self.LoL * area) / 3600.0; // Superficial Liquid velocity [m/s]
        let UTP = UGS + ULS; // Two Phase Velocity [m/s]
        let Um = UTP;
        let C0 = 1.0; // The Distribution parameter [-]
        let K = -0.6; // Drift-flux coefficient [-]
        let Ub = C0 * Um + K * ((G * self.ID * (self.LoL - self.LoG) / self.LoL).sqrt()); // bubble velocity down flow [m/s]
        let mut HL = 1.0 - UGS / Ub; // Liquid Hold-up [-]
        if HL > 0.75 {
            HL = 0.75;
        }
        let alfa = 0.25; // Gas average void fraction [-]
        let LoLS: f64 = self.LoL * (1.0 - alfa) + self.LoG * alfa;
        let muLS = self.muL * (1.0 - alfa) + self.muG * alfa;
        let ReLS = LoLS * Um * self.ID / muLS;
        let f0 = self.fanning(ReLS) * 4.0; // single phase Moddy Darcy Friction Factor [-]
        let Landa: f64 = 0.75;
        let LnLanda = -1.0 * Landa.ln();
        let fTP = (1.0
            + LnLanda
                / (1.281 - 0.478 * LnLanda + 0.444 * LnLanda.powf(2.0)
                    - 0.094 * LnLanda.powf(3.0)
                    + 0.00843 * LnLanda.powf(4.0)))
            * f0; // Two Phase Moddy (Darcy) friction factor [-]
        let Pfric =
            fTP * LoLS * Um.powf(2.0) / (2.0 * G * self.ID) * HL / 10000.0 * 100.0 * self.SF;
        let Pgrav = (HL * self.LoL + (1.0 - HL) * self.LoG) / 10000.0 * 100.0;
        let LoNS = (self.WL + self.WG) / (self.WL / self.LoL + self.WG / self.LoG); // No-Slip Velocity [m/s]
        let Loip = self.LoL * HL + self.LoG * (1.0 - HL);
        let Head = LoNS * UTP.powf(2.0) / (2.0 * G) / 10000.0; // 1.0 Velocity Head
        let Ef = (LoNS * 0.062428) * (UTP * 3.28084).powf(2.0) / 10000.0; // Erosion Factor must transfer to imperial unit
        self.Pfric = Pfric;
        self.Ef = Ef;
    }

    fn BubbleModel(&mut self) {
        let area = std::f64::consts::PI / 4.0 * self.ID * self.ID; // pipe inside cross section area [m^2]
        let UGS = self.WG / (self.LoG * area) / 3600.0; // Superficial Vapor velocity [m/s]
        let ULS = self.WL / (self.LoL * area) / 3600.0; // Superficial Liquid velocity [m/s]
        let UTP = UGS + ULS; // Two Phase Velocity [m/s]
        let Um = UTP;
        let C0 = 1.0; // The Distribution parameter [-]
        let K = 0.0; // Drift-flux coefficient [-]
        let Ub = C0 * Um + K * (self.ST * G * (self.LoL - self.LoG) / self.LoL.powi(2)).powf(0.25); // bubble velocity down flow [m/s]
        let HL = 1.0 - UGS / Ub; // Liquid Hold-up [-]
        let Landa = (self.WL / self.LoL) / (self.WL / self.LoL + self.WG / self.LoG);
        let LoTP = self.LoL * Landa.powi(2) / HL + self.LoG * (1.0 - Landa).powi(2) / (1.0 - HL); // Two phase density [kg/m^3]
        let muTP = self.muL * Landa + self.muG * (1.0 - Landa); // Two Phase Viscosity [Kg/(m-s)]
        let ReTP = LoTP * Um * self.ID / muTP; // Two phase Reynold Number [-]

        // Assuming Fanning is a function that you have defined elsewhere
        let f0 = self.fanning(ReTP) * 4.0; // Darcy friction factor [-]
        let LnLanda = -1.0 * Landa.ln();
        let fTP = (1.0
            + LnLanda
                / (1.281 - 0.478 * LnLanda + 0.444 * LnLanda.powi(2) - 0.094 * LnLanda.powi(3)
                    + 0.00843 * LnLanda.powi(4)))
            * f0; // Two Phase Moddy (Darcy) friction factor [-]
        let Pfric = fTP * LoTP * Um.powi(2) / (2.0 * G * self.ID) / 10000.0 * 100.0 * self.SF;
        let Pgrav = (HL * self.LoL + (1.0 - HL) * self.LoG) / 10000.0 * 100.0;
        let LoNS = (self.WL + self.WG) / (self.WL / self.LoL + self.WG / self.LoG); // No-Slip Velocity [m/s]
        let Head = LoNS * UTP.powi(2) / (2.0 * G) / 10000.0; // 1.0 Velocity Head
        let Ef = (LoNS * 0.062428) * (UTP * 3.28084).powi(2) / 10000.0; // Erosion Factor must transfer to imperial unit
        self.Pfric = Pfric;
        self.Ef = Ef;
    }

    pub fn flow_regime(&mut self) {
        let ratio_a = 0.0;
        let ratio_b = 0.0;
        let ratio_c = 0.0;
        let ratio_d = 0.0;
        let mut Dcrit = 0.0;

        let Vg = self.muG / self.LoG; // vapor kinematic viscosity [m^2/s]
        let VL = self.muL / self.LoL; // Liquid kinematic viscosity [m^2/s]
        let area = std::f64::consts::PI / 4.0 * self.ID * self.ID; // pipe inside cross section area [m^2]
        let UX = self.WG / (self.LoG * area) / 3600.0; // Vapor velocity [m/s]
        let UY = self.WL / (self.LoL * area) / 3600.0; // Liquid velocity [m/s]

        let Db = 0.096887; // 無因次液膜厚度 [-] Db = δ/D
        let SL = std::f64::consts::PI * self.ID; // 氣泡施予管壁之濕潤周長 [m]
        let Si = std::f64::consts::PI * self.ID * (1.0 - 2.0 * Db); // 界面剪應力施予氣液界面的濕潤周長 [m]
        let AL = std::f64::consts::PI * self.ID.powi(2) * (Db - Db.powi(2)); // 管中液膜所佔橫截面積 [m^2]
        let AG = std::f64::consts::PI * self.ID.powi(2) * (0.5 - Db).powi(2); // 管中氣體核所佔橫截面積 [m^2]
        let DL = 4.0 * self.ID * (Db - Db.powi(2)); // 液體的水力直徑 [m]
        let DG = (1.0 - 2.0 * Db) * self.ID; // 氣泡的水力直徑 [m]

        const n: f64 = 0.2; // Eq (7) 中的次冪
        const m: f64 = 0.2; // Eq (7) 中的次冪
        const CG: f64 = 0.046; // 氣體摩擦因子關聯式中的常數
        const CL: f64 = 0.046; // 液體摩擦因子關聯式中的常數
        let UG = 4.0 * UX / (1.0 - 4.0 * Db + 4.0 * Db * Db); // 氣體的真實速度 [m/s]
        let f1 = CL * (DL / VL).powf(-n);
        let f2 = CG * (DG / Vg).powf(-m);
        let fi = f2 * UG.powf(-m);
        let K1 = Si * (1.0 / AL + 1.0 / AG);
        let K2 = fi * self.LoG / 2.0;
        let K3 = K2 * 2.0 * UG;
        let K4 = G * (self.LoL - self.LoG);
        let K5 = f1 * self.LoL / 2.0 * SL / AL;

        // Root-finding by Newton-Raphson Method to solve UL
        let mut delta = 1.0; // absolute error
        let eps = 0.001; // allowable tolerance
        let mut UL = UY / 4.0 / (Db - Db * Db); // initial value of UL

        while delta > eps {
            let gx =
                (K2 * UL.powi(2) - K3 * UL + K2 * UG.powi(2)) * K1 + K4 - K5 * UL.powf(2.0 - n);
            let gpx = (2.0 * K2 * UL - K3) * K1 - K5 * (2.0 - n) * UL.powf(1.0 - n);
            let ULcal = UL - gx / gpx;
            delta = (ULcal - UL).abs();
            UL = (UL + ULcal) / 2.0;
        }

        // ratio A calculation
        let UYA = UL * 4.0 * (Db - Db * Db); // The manuscript here has divided by 2, Eq (9) does not
        let ratio_a = UY / UYA;

        // Dcrit calculation
        Dcrit = 4.36f64.powi(2) * ((self.LoL - self.LoG) * self.ST / self.LoL.powi(2) / G).sqrt();

        // ratio D calculation
        let mut alfa = 0.52;
        let mut U0 = 1.53 * (G * (self.LoL - self.LoG) * self.ST / self.LoL.powi(2)).powf(0.25);
        let UYD = UX * (1.0 - alfa) / alfa + (1.0 - alfa) * U0; // ref. Eq. (19) (24)
        let ratio_d = UY / UYD; // The manuscript here is misprinted as ratioC

        // ratio C calculation
        // Assuming getUYCFromCurveC is a function that you have defined elsewhere
        let UYC = self.get_uyc_from_curve_c(UX);
        let ratio_c = UY / UYC;

        // ratio B calculation
        alfa = 0.25;
        U0 = 1.53 * (G * (self.LoL - self.LoG) * self.ST / self.LoL.powi(2)).powf(0.25);
        let UYB = (1.0 - alfa) / alfa * UX + (1.0 - alfa) * U0; // Eq. (23)
        let ratio_b = UY / UYB;

        // println!("ratio a: {}", ratio_a);
        // println!("ratio b: {}", ratio_b);
        // println!("ratio c: {}", ratio_c);
        // println!("ratio d: {}", ratio_d);
        if ratio_a < 1.0 {
            self.flow_regime = String::from("Vertical Down Annular Flow");
        } else {
            if self.ID <= Dcrit {
                // Case II, Figure 2(b), Curve C-D
                if ratio_d < 1.0 {
                    self.flow_regime = String::from("Vertical Down Slug Flow");
                } else {
                    if ratio_c < 1.0 {
                        self.flow_regime = String::from("Vertical Down Slug Flow");
                    } else {
                        self.flow_regime = String::from("Vertical Down Dispersed-Bubble Flow");
                    }
                }
            } else {
                // D > Dcrit , Case I, Figure 2(a), Curve B-C-D
                if ratio_d < 1.0 {
                    self.flow_regime = String::from("Vertical Down Slug Flow");
                } else {
                    if ratio_c < 1.0 {
                        self.flow_regime = String::from("Vertical Down Slug Flow");
                    } else {
                        if ratio_b < 1.0 {
                            self.flow_regime = String::from("Vertical Down Slug Flow");
                        } else {
                            self.flow_regime = String::from("Vertical Down Dispersed-Bubble Flow");
                        }
                    }
                }
            }
        }
    }

    pub fn model_cal(&mut self) {
        self.flow_regime();
        if self.flow_regime == "Vertical Down Annular Flow" {
            self.AnnularModel();
        } else if self.flow_regime == "Vertical Down Slug Flow" {
            self.SlugModel();
        } else if self.flow_regime == "Vertical Down Dispersed-Bubble Flow" {
            self.BubbleModel();
        } else {
            println!("No match model for this flow pattern !!")
        }
    }
}

impl Serialize for VerticalDown {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("VerticalDown", 14)?;
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
