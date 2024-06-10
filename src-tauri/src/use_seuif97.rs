extern crate seuif97;

use serde::ser::{Serialize, SerializeStruct, Serializer};
use seuif97::*;
pub struct SteamProps {
    pub p: f64,   // 0. Pressure, MPa
    pub t: f64,   // 1. Temperature, ℃
    pub d: f64,   // 2. Density, kg/m³
    pub v: f64,   // 3. Specific Volume, m³/kg
    pub h: f64,   // 4. Specific enthalpy, kJ/kg
    pub s: f64,   // 5. Specific entropy, kJ/(kg·K)
    pub u: f64,   // 7. Specific internal energy, kJ/kg
    pub x: f64,   // 15. steam quality, 0 <= x <= 1
    pub dv: f64,  // 24. Dynamic viscosity, Pa·s
    pub kv: f64,  // 25. Kinematic viscosity, m2/s
    pub k: f64,   // 26. Thermal conductivity, W/(m·K)
    pub td: f64,  // 27. Thermal diffusivity, m2/s
    pub st: f64,  // 29. Surface tension, N/m
    pub lat: f64, // cal. property, Latent Heat
}

impl Serialize for SteamProps {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("SteamProps", 14)?;
        state.serialize_field("p", &self.p)?;
        state.serialize_field("t", &self.t)?;
        state.serialize_field("d", &self.d)?;
        state.serialize_field("v", &self.v)?;
        state.serialize_field("h", &self.h)?;
        state.serialize_field("s", &self.s)?;
        state.serialize_field("u", &self.u)?;
        state.serialize_field("x", &self.x)?;
        state.serialize_field("dv", &self.dv)?;
        state.serialize_field("kv", &self.kv)?;
        state.serialize_field("k", &self.k)?;
        state.serialize_field("td", &self.td)?;
        state.serialize_field("st", &self.st)?;
        state.serialize_field("lat", &self.lat)?;
        state.end()
    }
}

impl SteamProps {
    pub fn new() -> SteamProps {
        SteamProps {
            p: -999.0,
            t: -999.0,
            d: -999.0,
            v: -999.0,
            h: -999.0,
            s: -999.0,
            u: -999.0,
            x: -999.0,
            dv: -999.0,
            kv: -999.0,
            k: -999.0,
            td: -999.0,
            st: -999.0,
            lat: -999.0,
        }
    }

    pub fn call_seuif(&mut self, p: f64, t: f64, mode: u32) -> SteamProps {
        // p: f64  // 壓力, 單位 MPa
        // t: f64  // 溫度, 單位攝氏度
        // mode: u32  // (10, 20, 30, 40, 50, 60)

        match mode {
            10 => self.sat_steam_by_temp(t),
            20 => self.sat_steam_by_pres(p),
            30 => self.sat_water_by_temp(t),
            40 => self.sat_water_by_pres(p),
            50 => self.superheat_steam(p, t),
            60 => self.subcool_water(p, t),
            _ => SteamProps::new(),
        }
    }

    fn sat_steam_by_temp(&mut self, t: f64) -> SteamProps {
        let mut sp = SteamProps::new();
        sp.p = tx(t, 1.0, 0); // 計算在給定溫度下的飽和壓力
        sp.d = tx(t, 1.0, 2); // 計算在給定溫度下的密度
        sp.v = tx(t, 1.0, 3); // 計算在給定溫度下的比容
        sp.h = tx(t, 1.0, 4); // 計算在給定溫度下的比焓
        sp.s = tx(t, 1.0, 5); // 計算在給定溫度下的比熵
        sp.u = tx(t, 1.0, 7); // 計算在給定溫度下的比內能
        sp.x = tx(t, 1.0, 15); // 計算在給定溫度下的蒸氣比率
        sp.dv = tx(t, 1.0, 24); // 計算在給定溫度下的靜黏度
        sp.kv = tx(t, 1.0, 25); // 計算在給定溫度下的動黏度
        sp.k = tx(t, 1.0, 26); // 計算在給定溫度下的熱傳導係數
        sp.td = tx(t, 1.0, 27); // 計算在給定溫度下的熱擴散係數
        sp.st = tx(t, 1.0, 29); // 計算在給定溫度下的表面張力
        sp.lat = tx(t, 1.0, 4) - tx(t, 0.0, 4); // 計算在給定溫度下的潛熱 (蒸發熱)

        sp
    }

    fn sat_steam_by_pres(&mut self, p: f64) -> SteamProps {
        let mut sp = SteamProps::new();
        sp.t = px(p, 1.0, 1); // 計算在給定壓力下的飽和溫度
        sp.d = px(p, 1.0, 2); // 計算在給定壓力下的密度
        sp.v = px(p, 1.0, 3); // 計算在給定壓力下的比容
        sp.h = px(p, 1.0, 4); // 計算在給定壓力下的比焓
        sp.s = px(p, 1.0, 5); // 計算在給定壓力下的比熵
        sp.u = px(p, 1.0, 7); // 計算在給定壓力下的比內能
        sp.x = px(p, 1.0, 15); // 計算在給定壓力下的蒸氣比率
        sp.dv = px(p, 1.0, 24); // 計算在給定壓力下的靜黏度
        sp.kv = px(p, 1.0, 25); // 計算在給定壓力下的動黏度
        sp.k = px(p, 1.0, 26); // 計算在給定壓力下的熱傳導係數
        sp.td = px(p, 1.0, 27); // 計算在給定壓力下的熱擴散係數
        sp.st = px(p, 1.0, 29); // 計算在給定壓力下的表面張力
        sp.lat = px(p, 1.0, 4) - px(p, 0.0, 4); // 計算在給定壓力下的潛熱 (蒸發熱)

        sp
    }

    fn sat_water_by_temp(&mut self, t: f64) -> SteamProps {
        let mut sp = SteamProps::new();

        sp.d = tx(t, 0.0, 2); // 計算在給定溫度下的密度
        sp.v = tx(t, 0.0, 3); // 計算在給定溫度下的比容
        sp.h = tx(t, 0.0, 4); // 計算在給定溫度下的比焓
        sp.s = tx(t, 0.0, 5); // 計算在給定溫度下的比熵
        sp.u = tx(t, 0.0, 7); // 計算在給定溫度下的比內能
        sp.x = tx(t, 0.0, 15); // 計算在給定溫度下的蒸氣比率
        sp.dv = tx(t, 0.0, 24); // 計算在給定溫度下的靜黏度
        sp.kv = tx(t, 0.0, 25); // 計算在給定溫度下的動黏度
        sp.k = tx(t, 0.0, 26); // 計算在給定溫度下的熱傳導係數
        sp.td = tx(t, 0.0, 27); // 計算在給定溫度下的熱擴散係數
        sp.st = tx(t, 0.0, 29); // 計算在給定溫度下的表面張力

        sp
    }

    fn sat_water_by_pres(&mut self, p: f64) -> SteamProps {
        let mut sp = SteamProps::new();

        sp.d = px(p, 0.0, 2); // 計算在給定壓力下的密度
        sp.v = px(p, 0.0, 3); // 計算在給定壓力下的比容
        sp.h = px(p, 0.0, 4); // 計算在給定壓力下的比焓
        sp.s = px(p, 0.0, 5); // 計算在給定壓力下的比熵
        sp.u = px(p, 0.0, 7); // 計算在給定壓力下的比內能
        sp.x = px(p, 0.0, 15); // 計算在給定壓力下的蒸氣比率
        sp.dv = px(p, 0.0, 24); // 計算在給定壓力下的靜黏度
        sp.kv = px(p, 0.0, 25); // 計算在給定壓力下的動黏度
        sp.k = px(p, 0.0, 26); // 計算在給定壓力下的熱傳導係數
        sp.td = px(p, 0.0, 27); // 計算在給定壓力下的熱擴散係數
        sp.st = px(p, 0.0, 29); // 計算在給定壓力下的表面張力

        sp
    }

    fn superheat_steam(&mut self, p: f64, t: f64) -> SteamProps {
        let mut sp = SteamProps::new();

        sp.d = pt(p, t, 2); // 計算在給定壓力和溫度下的密度
        sp.v = pt(p, t, 3); // 計算在給定壓力和溫度下的比容
        sp.h = pt(p, t, 4); // 計算在給定壓力和溫度下的比焓
        sp.s = pt(p, t, 5); // 計算在給定壓力和溫度下的比熵
        sp.u = pt(p, t, 7); // 計算在給定壓力和溫度下的比內能
        sp.x = pt(p, t, 15); // 計算在給定壓力和溫度下的蒸氣比率
        sp.dv = pt(p, t, 24); // 計算在給定壓力和溫度下的靜黏度
        sp.kv = pt(p, t, 25); // 計算在給定壓力和溫度下的動黏度
        sp.k = pt(p, t, 26); // 計算在給定壓力和溫度下的熱傳導係數
        sp.td = pt(p, t, 27); // 計算在給定壓力和溫度下的熱擴散係數
        sp.st = pt(p, t, 29); // 計算在給定壓力和溫度下的表面張力

        sp
    }

    fn subcool_water(&mut self, p: f64, t: f64) -> SteamProps {
        let mut sp = SteamProps::new();

        sp.d = pt(p, t, 2); // 計算在給定壓力和溫度下的密度
        sp.v = pt(p, t, 3); // 計算在給定壓力和溫度下的比容
        sp.h = pt(p, t, 4); // 計算在給定壓力和溫度下的比焓
        sp.s = pt(p, t, 5); // 計算在給定壓力和溫度下的比熵
        sp.x = pt(p, t, 15); // 計算在給定壓力和溫度下的蒸氣比率
        sp.dv = pt(p, t, 24); // 計算在給定壓力和溫度下的靜黏度
        sp.kv = pt(p, t, 25); // 計算在給定壓力和溫度下的動黏度
        sp.k = pt(p, t, 26); // 計算在給定壓力和溫度下的熱傳導係數
        sp.td = pt(p, t, 27); // 計算在給定壓力和溫度下的熱擴散係數
        sp.st = pt(p, t, 29); // 計算在給定壓力和溫度下的表面張力

        sp
    }
}
