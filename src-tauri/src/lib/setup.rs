use log::info;
use tauri::{App, Manager};

use crate::lib::conf::AppConf;

pub fn init(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    info!("stepup");

    let app_conf = AppConf::read();

    if app_conf.hide_dock_icon {
        #[cfg(target_os = "macos")]
        app.set_activation_policy(tauri::ActivationPolicy::Accessory);
    }

    // let window = app.get_window("")
    let window = app.get_window("main").unwrap();

    window.set_always_on_top(app_conf.stay_on_top);

    Ok(())
}
