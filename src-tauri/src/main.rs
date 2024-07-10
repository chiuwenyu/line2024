// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod single_phase;

use twoline::TwoPhaseLine;

use crate::single_phase::SingleFx;

mod use_seuif97;
use crate::use_seuif97::SteamProps;

mod horizontal;
mod twoline;
mod vertical_down;
mod vertical_up;
use crate::horizontal::Horizontal;
use crate::vertical_down::VerticalDown;
use crate::vertical_up::VerticalUp;

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
    lo_l: f64,
    lo_g: f64,
    mu_l: f64,
    mu_g: f64,
    surface_tension: f64,
    rough: f64,
    sf: f64,
    id: f64,
    slope: f64,
) -> VerticalUp {
    let mut vu: VerticalUp = VerticalUp::new(
        wl,
        wg,
        lo_l,
        lo_g,
        mu_l,
        mu_g,
        surface_tension,
        rough,
        sf,
        id,
        slope,
    );
    vu.model_cal();
    vu
}

#[tauri::command]
fn invoke_vertical_down_hydraulic(
    wl: f64,
    wg: f64,
    lo_l: f64,
    lo_g: f64,
    mu_l: f64,
    mu_g: f64,
    surface_tension: f64,
    rough: f64,
    sf: f64,
    id: f64,
    slope: f64,
) -> VerticalDown {
    let mut vd: VerticalDown = VerticalDown::new(
        wl,
        wg,
        lo_l,
        lo_g,
        mu_l,
        mu_g,
        surface_tension,
        rough,
        sf,
        id,
        slope,
    );
    vd.model_cal();
    vd
}

#[tauri::command]
fn invoke_horizontal_hydraulic(
    wl: f64,
    wg: f64,
    lo_l: f64,
    lo_g: f64,
    mu_l: f64,
    mu_g: f64,
    surface_tension: f64,
    rough: f64,
    sf: f64,
    id: f64,
    slope: f64,
) -> Horizontal {
    let mut h1: Horizontal = Horizontal::new(
        wl,
        wg,
        lo_l,
        lo_g,
        mu_l,
        mu_g,
        surface_tension,
        rough,
        sf,
        id,
        slope,
    );
    h1.model_cal();
    h1
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![invoke_seuif, invoke_hydraulic])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
