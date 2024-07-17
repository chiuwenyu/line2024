// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod use_seuif97;
use crate::use_seuif97::SteamProps;
mod single_phase;
use crate::single_phase::SingleFx;
mod vertical_up;
use crate::vertical_up::VerticalUp;
mod horizontal;
use crate::horizontal::Horizontal;
mod vertical_down;
use crate::vertical_down::VerticalDown;

#[tauri::command]
fn invoke_seuif(pressure: f64, temperature: f64, mode: u32) -> SteamProps {
    let mut steam = SteamProps::new();
    steam.call_seuif(pressure, temperature, mode)
}

#[tauri::command]
fn invoke_hydraulic(w: f64, rho: f64, mu: f64, id: f64, e: f64, sf: f64) -> SingleFx {
    let mut single_phase = SingleFx::new(w, rho, mu * 0.001, id * 2.54 / 100.0, e / 1000.0, sf);
    single_phase.hydraulic();
    single_phase
}

#[tauri::command]
fn invoke_vertical_up_hydraulic(
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
) -> VerticalUp {
    let mut vu: VerticalUp =
        VerticalUp::new(wl, wg, lol, logg, mul, mug, st, rough, sf, id, degree);
    vu.model_cal();
    vu
}

#[tauri::command]
fn invoke_vertical_down_hydraulic(
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
) -> VerticalDown {
    let mut vd: VerticalDown =
        VerticalDown::new(wl, wg, lol, logg, mul, mug, st, rough, sf, id, degree);
    vd.model_cal();
    vd
}

#[tauri::command]
fn invoke_horizontal_hydraulic(
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
) -> Horizontal {
    let mut hori: Horizontal =
        Horizontal::new(wl, wg, lol, logg, mul, mug, st, rough, sf, id, degree);
    hori.model_cal();
    hori
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            invoke_seuif,
            invoke_hydraulic,
            invoke_vertical_up_hydraulic,
            invoke_horizontal_hydraulic,
            invoke_vertical_down_hydraulic
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
