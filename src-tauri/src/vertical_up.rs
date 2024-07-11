#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(non_snake_case)]

// 檔案的其他內容

use serde::ser::{Serialize, SerializeStruct, Serializer};

use std::f32::consts::PI;

use twoline::TwoPhaseLine;

use crate::twoline;
use crate::twoline::Regime;
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
        }
    }
}

impl Serialize for VerticalUp {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("VerticalUp", 11)?;
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
        state.end()
    }
}
