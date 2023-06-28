#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::path::PathBuf;

use log::info;

use crate::{
    lib::conf::APP_VERSION,
    tauri_commands::{api::generate_api, conf::get_app_conf},
};

mod lib;
mod tauri_commands;

fn main() {
    lib::log::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_api, get_app_conf])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
