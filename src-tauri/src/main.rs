// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod single_phase;
use crate::single_phase::SingleFx;

mod use_seuif97;
use crate::use_seuif97::SteamProps;

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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![invoke_seuif, invoke_hydraulic])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
