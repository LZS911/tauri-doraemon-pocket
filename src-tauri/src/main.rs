#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use lib::{conf::AppConf, menu, setup};

use crate::tauri_commands::{
    api::generate_api, conf::form_confirm, conf::get_app_conf, conf::get_color_schema,
    conf::get_lang, conf::get_platform, conf::get_theme, conf::reset_app_conf,
};

mod lib;
mod tauri_commands;

fn main() {
    let app_conf = AppConf::read().write();

    let log = lib::plugin::log::init();

    let mut builder = tauri::Builder::default()
        .plugin(log.build())
        .invoke_handler(tauri::generate_handler![
            generate_api,
            get_app_conf,
            get_theme,
            get_color_schema,
            reset_app_conf,
            form_confirm,
            get_lang,
            get_platform
        ])
        .setup(setup::init)
        .menu(menu::init());

    builder
        .on_menu_event(menu::menu_handler)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
