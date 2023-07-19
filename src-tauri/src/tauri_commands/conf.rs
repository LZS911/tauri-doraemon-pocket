use tauri::AppHandle;

use crate::lib::{
    conf::{AppConf, ProjectConf, APP_CONF_PATH},
    utils::{Response, ResponseCode},
};

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
pub fn get_project_conf() -> Vec<ProjectConf> {
    AppConf::get_project_conf()
}

#[tauri::command]
pub fn add_project_conf(data: serde_json::Value) -> Response {
    AppConf::read().insert_project(data).write();
    Response {
        code: ResponseCode::SUCCEEDED,
        message: "add succeeded".into(),
        data: "".into(),
    }
}

#[tauri::command]
pub fn edit_project_conf(data: serde_json::Value) -> Response {
    AppConf::read().update_project(data).write();
    Response {
        code: ResponseCode::SUCCEEDED,
        message: "edit succeeded".into(),
        data: "".into(),
    }
}

#[tauri::command]
pub fn delete_project_conf(data: String) -> Response {
    AppConf::read().delete_project(data).write();
    Response {
        code: ResponseCode::SUCCEEDED,
        message: "delete succeeded".into(),
        data: "".into(),
    }
}
