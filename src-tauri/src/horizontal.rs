#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]

use serde::ser::{Serialize, SerializeStruct, Serializer};
use std::f64;
const G: f64 = 9.81; // gravity accelerator [,/s^2]
const GC: f64 = 9.8; // gravity constant [kg-m/kgf-s^2]

pub struct Horizontal {
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

    // result data
    Head: f64,  // 1.0 Velocity Head [Kgf/cm^2]
    Pfric: f64, // frictional pressure drop [Kgf/cm^2/100m]
    Pgrav: f64, // Elevation Head drop [Kgf/cm^2/100m]
    Ef: f64,    // Erosion Factor [-]

    // Similarity Analysis Model Result
    Loip: f64, // Two-Phase Density [Kg/m^3]
    RL: f64,   // Liquid Volume Fraction [-]
    UTP: f64,  // Two Phase Velocity [m/s]

    // Stratified Model Result
    LoTP: f64,  // Two-Phase Density [Kg/m^3]
    depth: f64, // Liquid Depth - BOP [m]
    velL: f64,  // Liquid Velocity [m/s]
    velG: f64,  // Vapor Velocity [m/s]

    // Slug Model Result
    LoSU: f64, // Two-Phase Slug Unit Density [Kg/m^3]
    LoLS: f64, // Liquid Slug Unit Density [Kg/m^3]
    Us: f64,   // Liquid Slug Velocity [m/s]
    Ls: f64,   // Liquid Slug Length [m]
    Lu: f64,   // Slug Unit Length [m]
}

impl Horizontal {
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
        Horizontal {
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
            Head: 0.0,
            Pfric: 0.0,
            Pgrav: 0.0,
            Ef: 0.0,
            Loip: 0.0,
            RL: 0.0,
            UTP: 0.0,
            LoTP: 0.0,
            depth: 0.0,
            velL: 0.0,
            velG: 0.0,
            LoSU: 0.0,
            LoLS: 0.0,
            Us: 0.0,
            Ls: 0.0,
            Lu: 0.0,
        }
    }
}

impl Horizontal {
    fn fhLL(&self, DD: f64, h: f64, XS: f64) -> f64 {
        let term1 = (2.0 * h - 1.0).acos(); // Eq. (13)
        let term2 = (1.0 - (2.0 * h - 1.0).powi(2)).sqrt(); // Eq. (14)
        let ALB = 0.25 * (std::f64::consts::PI - term1 + (2.0 * h - 1.0) * term2); // Eq. (10)
        let AGB = 0.25 * (term1 - (2.0 * h - 1.0) * term2); // Eq. (11)
        let SLB = std::f64::consts::PI - term1; // Eq. (12)
        let SGB = term1; // Eq. (13)
        let SiB = term2; // Eq. (14)
        let AB = std::f64::consts::PI / 4.0; // 相對於面積參考量 D^2 的無因次管截面積
        let ULB = AB / ALB; // Eq. (15)
        let UGB = AB / AGB; // Eq. (16)
        let DLB = 4.0 * ALB / SLB; // Eq. (6)
        let DGB = 4.0 * AGB / (SGB + SiB); // Eq. (6)
        let term3 = (self.LoL - self.LoG) * G * self.degree.sin(); // Eq. (9) Numerator
        let CG = 0.046; // 氣體摩擦因子關聯式中的常數 for turbulent flow
        let m = 0.2; // Eq. (5) 中的次幕 for turbulent flow
        let nuG = self.muG / self.LoG; // Dynamic Viscosity of Gas [Stoke]
        let area = std::f64::consts::PI * DD * DD / 4.0; // pipe area [m^2]
        let UX = self.WG / self.LoG / area / 3600.0; // Vapor Velocity [m/s]
        let term4 = 4.0 * CG / DD * (UX * DD / nuG).powf(-m) * (self.LoG * UX.powi(2) / 2.0); // Eq. (9) denominator
        let Y = term3 / term4; // 流體在流動方向之重力與壓降比值 (向上流動取負，向下流動取正，水平管 Y =0;

        let n = 0.2; // Eq. (5) 中的次幕 for turbulent flow
        let term5 = (ULB * DLB).powf(-n) * ULB.powi(2) * SLB / ALB;
        let term6 = (UGB * DGB).powf(-m) * UGB.powi(2) * (SGB / AGB + SiB / ALB + SiB / AGB);

        if XS == 0.0 {
            (4.0 * Y + term6 / term5).sqrt() // Eq. (7)
        } else {
            XS.powi(2) * term5 - term6 - 4.0 * Y
        }
    }

    fn ratioB(&self, X: f64, Y: f64) -> f64 {
        let hL = 0.5; // Kellogg modify to 0.35, but original still take 0.5
        let AB = std::f64::consts::PI / 4.0;
        let SGB = (2.0f64 * hL - 1.0f64).acos();
        let SLB = std::f64::consts::PI - (2.0 * hL - 1.0).acos();
        let SiB = (1.0 - (2.0 * hL - 1.0).powf(2.0)).sqrt();
        let ALB = 0.25 * (std::f64::consts::PI - SGB + (2.0 * hL - 1.0) * SiB);
        let AGB = 0.25 * (SGB - (2.0 * hL - 1.0) * SiB);
        let ULB = AB / ALB;
        let UGB = AB / AGB;
        let n = 0.2;
        let m = 0.2;
        let DLB = 4.0 * ALB / SLB;
        let DGB = 4.0 * AGB / (SGB + SiB);
        let term1 = (ULB * DLB).powf(-n) * ULB.powf(2.0) * SLB / ALB;
        let term2 = (UGB * DGB).powf(-m) * UGB.powf(2.0) * (SGB / AGB + SiB / ALB + SiB / AGB);
        let result = (X * X * term1 / (4.0 * Y + term2)).sqrt();
        result
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

        let Pfric =
            fTP * LoTP * (ULS + UGS).powf(2.0) / (2.0 * G * self.ID) / 10000.0 * 100.0 * self.SF; // Eq. (32)
        let Pgrav = (self.LoL * (1.0 - Rg) + self.LoG * Rg) / 10000.0 * 100.0; // Eq. (33)
        let Loip = self.LoL * (1.0 - Rg) + self.LoG * Rg;
        let LoNS = (self.WL + self.WG) / (self.WL / self.LoL + self.WG / self.LoG);
        let Head = LoNS * UTP.powf(2.0) / (2.0 * G) / 10000.0;
        let Ef = (LoNS * 0.062428) * ((ULS + UGS) * 3.28084).powf(2.0) / 10000.0;
        self.Loip = Loip;
        self.RL = RL;
        self.UTP = UTP;
        self.Head = Head;
        self.Pfric = Pfric;
        self.Pgrav = Pgrav;
        self.Ef = Ef;
    }

    fn SlugModel(&mut self) {
        let area = std::f64::consts::PI * self.ID * self.ID / 4.0; // pipe area [m^2]
        let UGS = self.WG / self.LoG / area / 3600.0; // Vapor Velocity [m/s]
        let ULS = self.WL / self.LoL / area / 3600.0; // Liquid Velocity [m/s]
        let UM = UGS + ULS; // Vapor-Liquid Mixture Velocity [m/s]
        let Us = UM; // Slug Liquid mean Velocity [m/s], Eq. (50), Dukler (1975) as Rs = 1 in Eq. (49)
        let alfa = 8.66;
        let beta = 1.39;
        let Rs = 1.0 / (1.0 + (Us / alfa).powf(beta)); // Liquid Volume Fraction in Liquid-Slug [-], Eq. (54)
        let Res = self.ID * Us * (self.LoL * Rs + self.LoG * (1.0 - Rs))
            / (self.muL * Rs + self.muG * (1.0 - Rs)); // Reynold Number of Liquid-Slug [-], Eq. (66)
        let c = 0.021 * Res.ln() + 0.022; // Eq. (46) parameter
        let Ut = (1.0 + c) * Us; // Average Moving Velocity of Whole Slug Unit [m/s], Eq. (46)
        let RL = (ULS + Rs * (Ut - UM)) / Ut; // Liquid Hold-Up of Slug Unit [-]
        let Ls = 30.0 * self.ID; // Liquid-Slug Length [m]
        let mut Rfe = RL * 0.5; // Liquid Hold-Up of Film End [-]
        let mut delta = 1.0; // absolute error
        let eps = 1e-4; // Allowable Tolerance
        let mut Lf = 0.0; // Liquid Film Length [m]
        let mut Lu; // Slug Unit Length [m]

        while delta > eps {
            Lf = Ls * (Rs - RL) / (RL - Rfe); // Liquid Film Length [m]
            Lu = Lf + Ls; // Length of Liquid Slug [m]
            let Rfecal = Rs - (Rs * Us - ULS) * Lu / Lf / Ut; // Rfe calculated value
            delta = (Rfecal - Rfe).abs();
            Rfe = (Rfecal + Rfe) / 2.0;
        }

        let Lu = Lf + Ls;
        let LoSU = self.LoL * RL + self.LoG * (1.0 - RL);
        let LoLS = self.LoL * Rs + self.LoG * (1.0 - Rs);
        let Ufe = (ULS * (Ls + Lf) - Rs * Us * Ls) / (Rfe * Lf); // Liquid mean Velocity of liquid film end. [m/s]
        let Lm = 0.15 * (Us - Ufe).powf(2.0) / GC; // Mixture area length [m] Eq. (68)
        let f0 = self.fanning(Res) * 4.0;
        let Pfric = f0 * (self.LoL * Rs + self.LoG * (1.0 - Rs)) * Us.powf(2.0) * (Ls - Lm)
            / Lu
            / (2.0 * GC * self.ID)
            / 10000.0
            * 100.0
            * self.SF;
        let Pacc = self.LoL * Rfe * (Ut - Ufe) * (Us - Ufe) / (GC * Lu) / 10000.0 * 100.0; // Eq. (69) acceleration loss
        let Pfric = Pfric + Pacc;
        let LoNS = (self.WL + self.WG) / (self.WL / self.LoL + self.WG / self.LoG); // No-slip Two-Phase Density [Kg/m^3]
        let UTP = Us;
        let Head = LoNS * UTP.powf(2.0) / (2.0 * G) / 10000.0;
        let Ef = (LoNS * 0.062428) * ((ULS + UGS) * 3.28084).powf(2.0) / 10000.0;
        // must transfer to imperial unit
        self.Head = Head;
        self.Pfric = Pfric;
        self.Pgrav = 0.0;
        self.Ef = Ef;
        self.LoSU = LoSU;
        self.LoLS = LoLS;
        self.RL = RL;
        self.Us = Us;
        self.Ls = Ls;
        self.Lu = Lu;
    }

    fn Stratified(&mut self) {
        // assume turbulent flow Eq.(8), see ref. 01
        let X = (self.WL / self.WG).powf(0.9)
            * (self.LoG / self.LoL).sqrt()
            * (self.muL / self.muG).powf(0.1);
        // hla 波浪的平衡液位高 left initial value
        let mut hLa = 0.001f64;
        // hlb 波浪的平衡液位高 right initial value
        let mut hLb = 0.999f64;
        // hlm mean value
        let mut hLm;
        // allowable tolerance
        let eps = 1e-4;
        // solve non-linear equation by Bisection Method
        loop {
            hLm = (hLa + hLb) / 2.0;
            if self.fhLL(self.ID, hLa, X) * self.fhLL(self.ID, hLm, X) < 0.0 {
                hLb = hLm;
            } else {
                hLa = hLm;
            }
            if (hLb - hLa).abs() <= eps {
                break;
            }
        }

        let hL = hLm; // hL 波浪的平衡液位高 [m]
        let term1 = (2.0 * hL - 1.0).acos(); // Eq. (13)
        let term2 = (1.0 - (2.0 * hL - 1.0).powf(2.0)).sqrt(); // Eq. (14)
        let ALB = 0.25 * (std::f64::consts::PI - term1 + (2.0 * hL - 1.0) * term2); // Eq. (10)
        let AGB = 0.25 * (term1 - (2.0 * hL - 1.0) * term2); // Eq. (11)
        let RL = ALB / (ALB + AGB); // Liquid Holdup [-]
        let LoTP = self.LoL * RL + self.LoG * (1.0 - RL); // Two-Phase Density [Kg/m^3]
        let depth = hL * self.ID; // Liquid Depth - BOP [m]
        let area = f64::consts::PI * self.ID * self.ID / 4.0; // pipe area [m^2]
        let UGS = self.WG / self.LoG / area / 3600.0; // Vapor Velocity [m/s]
        let ULS = self.WL / self.LoL / area / 3600.0; // Liquid Velocity [m/s]
        let AB = f64::consts::PI / 4.0; // 相對於面積參考量 D^2 的無因次管截面積
        let ULB = AB / ALB; // Eq. (15)
        let UGB = AB / AGB; // Eq. (16)
        let velL = ULB * ULS; // Liquid Velocity [m/s]
        let velG = UGB * UGS; // Vapor Velocity [m/s]
        let SGB = (2.0 * hL - 1.0).acos();
        let SiB = (1.0 - (2.0 * hL - 1.0).powf(2.0)).sqrt();
        let DGB = 4.0 * AGB / (SGB + SiB);
        let m = 0.2;
        let fig2 = 0.25 * UGB.powf(2.0) * (UGB * DGB).powf(-m) / AGB * (SGB + SiB); // Eq. (40), assume fi / fG ~ 1.0
        let CG = 0.046;
        let nuG = self.muG / self.LoG; // Dynamic Viscosity of Gas [Stoke]
        let Pgs =
            4.0 * CG / self.ID * (UGS * self.ID / nuG).powf(-m) * (self.LoG * UGS.powf(2.0) / 2.0); // Eq. (9) denominator
        let Pfric = fig2 * Pgs / GC / 10000.0 * 100.0 * self.SF;
        let LoNS = (self.WL + self.WG) / (self.WL / self.LoL + self.WG / self.LoG); // No-Slip Velocity [m/s]
        let UTP = UGS + ULS; // Two Phase Velocity [m/s]
        let Head = LoNS * UTP.powf(2.0) / (2.0 * G) / 10000.0; // 1.0 Velocity Head
        let Ef = (LoNS * 0.062428) * (UTP * 3.28084).powf(2.0) / 10000.0; // Erosion Factor must transfer to imperial unit
        self.Head = Head;
        self.Pfric = Pfric;
        self.Pgrav = 0.0;
        self.Ef = Ef;
        self.LoTP = LoTP;
        self.depth = depth;
        self.velL = velL;
        self.velG = velG;
        self.RL = RL;
    }

    pub fn flow_regime(&mut self) {
        // assume turbulent flow Eq.(8), see ref. 01
        let X = (self.WL / self.WG).powf(0.9)
            * (self.LoG / self.LoL).sqrt()
            * (self.muL / self.muG).powf(0.1);
        let mut hLa = 0.001f64; // hla: 波浪的平衡液位高 left initial value
        let mut hLb = 0.999f64; // hlb: 波浪的平衡液位高 right initial value
        let mut hLm; // hlm: hL mean value
        let eps = 1e-4; // eps: allowable tolerance

        // solve non-linear equation by Bisection Method
        loop {
            hLm = (hLa + hLb) / 2.0;
            if self.fhLL(self.ID, hLa, X) * self.fhLL(self.ID, hLm, X) < 0.0 {
                hLb = hLm;
            } else {
                hLa = hLm;
            }
            if (hLb - hLa).abs() <= eps {
                break;
            }
        }

        let hL = hLm; // hL 波浪的平衡液位高 [m]
        let area = std::f64::consts::PI * self.ID * self.ID / 4.0; // pipe area [m^2]
        let UX = self.WG / self.LoG / area / 3600.0; // Vapor Velocity [m/s]
        let UY = self.WL / self.LoL / area / 3600.0; // Liquid Velocity [m/s]
        let F = (self.LoG / (self.LoL - self.LoG)).sqrt() * UX
            / (self.ID * G * self.degree.cos()).sqrt(); // Froude Number Eq.(26)
        let C2 = 1.0 - hL; // Eq. (24)
        let term1 = (2.0 * hL - 1.0).acos(); // Eq. (13)
        let term2 = (1.0 - (2.0 * hL - 1.0).powi(2)).sqrt(); // Eq. (14)
        let dALB = term2;
        let ALB = 0.25 * (std::f64::consts::PI - term1 + (2.0 * hL - 1.0) * term2); // Eq. (10)
        let AGB = 0.25 * (term1 - (2.0 * hL - 1.0) * term2); // Eq. (11)
        let AB = std::f64::consts::PI / 4.0; // 相對於面積參考量 D^2 的無因次管截面積
        let ULB = AB / ALB; // Eq. (15)
        let UGB = AB / AGB; // Eq. (16)
        let ratio_a = ((F.powi(2) / C2.powi(2)) * UGB.powi(2) * dALB / AGB).sqrt();
        // Eq. (25) for Curve A

        // ratio C here
        let nuL = self.muL / self.LoL; // Dynamic Viscosity of Liquid [Stoke]
        let ReLS = self.ID * UY / nuL; // Liquid Slug Reynold Number [-]
        let K = F * ReLS.sqrt(); // Wavy flow dimensionless parameter [-]
        let S: f64 = 0.01; // 隱藏參數 [-]
        let ratio_c = K * ULB.sqrt() * UGB * S.sqrt() / 2.0; // Eq. (30) for Curve C

        // ratio B here
        let term3 = (self.LoL - self.LoG) * G * (self.degree).sin(); // Eq. (9) Numerator
        let CG = 0.046; // 氣體摩擦因子關聯式中的常數 for turbulent flow
        let CL = 0.046; // 氣體摩擦因子關聯式中的常數 for turbulent flow
        let n = 0.2; // Eq. (5) 中的次幕 for turbulent flow
        let m = 0.2; // Eq. (5) 中的次幕 for turbulent flow
        let nuG = self.muG / self.LoG; // Dynamic Viscosity of Gas [Stoke]
        let term4 =
            4.0 * CG / self.ID * (UX * self.ID / nuG).powf(-m) * (self.LoG * UX.powf(2.0) / 2.0); // Eq. (9) denominator
        let Y = term3 / term4; // 流體在流動方向之重力與壓降比值 (向上流動取負，向下流動取正，水平管 Y =0;
        let ratio_b = self.ratioB(X, Y);

        // ratio D here
        let t1 = 4.0 * CL / self.ID * (UY * self.ID / nuG).powf(-n) * self.LoL * UY.powf(2.0) / 2.0;
        let t2 = (self.LoL - self.LoG) * G * (self.degree).cos();
        let T2 = t1 / t2; // Eq. (37)

        let SiB = (1.0 - (2.0 * hL - 1.0).powf(2.0)).sqrt(); // Eq. (14)
        let SLB = std::f64::consts::PI - (2.0 * hL - 1.0).acos(); // Eq. (12)
        let DLB = 4.0 * ALB / SLB; // Eq. (6)
        let ratio_d = T2 * SiB * ULB.powf(2.0) * (ULB * DLB).powf(-n) / 8.0 / AGB;
        // Eq. (36)

        // EE here
        let UGScal = ((UY + G * (self.LoL - self.LoG) * self.ST / self.LoL.powf(2.0)).powf(0.25))
            * 1.15
            / 3.0;
        let EE = UX / UGScal;

        // judge regime by ratio
        if ratio_a <= 1.0 {
            // left side
            if ratio_c <= 1.0 {
                // down side
                self.flow_regime = String::from("Hori Stratified Smooth Flow");
            } else {
                // top side
                self.flow_regime = String::from("Hori Stratified Wavy Flow");
            }
        } else {
            // right side
            if ratio_b <= 1.0 {
                self.flow_regime = String::from("Hori Annular-Dispersed Flow");
            } else {
                if ratio_d <= 1.0 {
                    if EE <= 1.0 {
                        self.flow_regime = String::from("Hori Elongated Bubble Flow");
                    } else {
                        self.flow_regime = String::from("Hori Intermittent-Slug Flow");
                    }
                } else {
                    self.flow_regime = String::from("Hori Dispersed Bubble Flow");
                }
            }
        }
    }

    pub fn model_cal(&mut self) {
        self.flow_regime();
        if self.flow_regime == "Hori Annular-Dispersed Flow" {
            self.SimilarityAnalysis();
        }
        if self.flow_regime == "Hori Dispersed Bubble Flow" {
            self.SimilarityAnalysis();
        }
        if self.flow_regime == "Hori Elongated Bubble Flow" {
            self.SlugModel();
        }
        if self.flow_regime == "Hori Intermittent-Slug Flow" {
            self.SlugModel();
        }
        if self.flow_regime == "Hori Stratified Smooth Flow" {
            self.Stratified();
        }
        if self.flow_regime == "Hori Stratified Wavy Flow" {
            self.Stratified();
        }
    }
}

impl Serialize for Horizontal {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("Horizontal", 28)?;
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
        state.serialize_field("Head", &self.Head)?;
        state.serialize_field("Pfric", &self.Pfric)?;
        state.serialize_field("Pgrav", &self.Pgrav)?;
        state.serialize_field("Ef", &self.Ef)?;
        state.serialize_field("Loip", &self.Loip)?;
        state.serialize_field("RL", &self.RL)?;
        state.serialize_field("UTP", &self.UTP)?;
        state.serialize_field("LoTP", &self.LoTP)?;
        state.serialize_field("depth", &self.depth)?;
        state.serialize_field("velL", &self.velL)?;
        state.serialize_field("velG", &self.velG)?;
        state.serialize_field("LoSU", &self.LoSU)?;
        state.serialize_field("LoLS", &self.LoLS)?;
        state.serialize_field("Us", &self.Us)?;
        state.serialize_field("Ls", &self.Ls)?;
        state.serialize_field("Lu", &self.Lu)?;
        state.end()
    }
}
