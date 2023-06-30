use tauri::AppHandle;

use crate::lib::conf::{AppConf, APP_CONF_PATH};

#[tauri::command]
pub fn get_app_conf() -> AppConf {
    AppConf::read()
}

#[tauri::command]
pub fn get_theme() -> String {
    AppConf::get_theme()
}

#[tauri::command]
pub fn get_color_schema() -> String {
    AppConf::get_color_schema()
}

#[tauri::command]
pub fn reset_app_conf() -> AppConf {
    AppConf::default().write()
}

#[tauri::command]
pub fn form_confirm(_app: AppHandle, data: serde_json::Value) {
    AppConf::read().amend(serde_json::json!(data)).write();
}

#[tauri::command]
pub fn get_lang() -> String {
    AppConf::get_lang()
}

#[tauri::command]
pub fn get_platform() -> String {
    AppConf::get_platform()
}
