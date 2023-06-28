use crate::lib::conf::AppConf;

#[tauri::command]
pub fn get_app_conf() -> AppConf {
    AppConf::read()
}
