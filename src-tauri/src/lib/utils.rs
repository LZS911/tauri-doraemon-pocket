use std::fs;

use serde::{Deserialize, Serialize};
use tauri::{Config, Manager};

use super::path;

#[derive(Serialize, Deserialize, Debug)]
pub struct Response {
    pub code: ResponseCode,
    pub message: String,
    pub data: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum ResponseCode {
    SUCCEEDED = 0,
    FAILED = 1,
}

pub fn clear_conf(app: &tauri::AppHandle) {
    let root = path::app_root();
    let msg = format!(
      "Path: {}\n
      Are you sure you want to clear all DoraemonPocket configurations? Performing this operation data can not be restored, please back up in advance.\n
      Note: The application will exit automatically after the configuration cleanup!",
      root.to_string_lossy()
    );
    tauri::api::dialog::ask(
        app.get_window("core").as_ref(),
        "Clear Config",
        msg,
        move |is_ok| {
            if is_ok {
                fs::remove_dir_all(root).unwrap();
                std::process::exit(0);
            }
        },
    );
}
