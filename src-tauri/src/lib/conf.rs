use std::{collections::BTreeMap, path::PathBuf};

use log::{error, info};
use serde::{Deserialize, Serialize};

use serde_json::Value;
#[cfg(target_os = "macos")]
use tauri::TitleBarStyle;
use tauri::{Manager, Theme};

use super::path::{app_root, create_file, path_exists};

macro_rules! pub_struct {
    ($name:ident {$($field:ident: $t:ty,)*}) => {
      #[derive(Serialize, Deserialize, Debug, Clone)]
      pub struct $name {
        $(pub $field: $t),*
      }
    }
  }

pub_struct!(AppConf {
    titlebar: bool,
    hide_dock_icon: bool,
    stay_on_top: bool,
    tray: bool,

    theme: String,
    color_schema: String,
    lang: String,

    speech_lang: String,
    auto_update: String,

    // Main Window
    isinit: bool,
    popup_search: bool,
    main_close: bool,
    main_dashboard: bool,
    main_width: f64,
    main_height: f64,

    //app conf
    show_welcome: bool,
});

pub const APP_VERSION: Option<&str> = option_env!("CARGO_PKG_VERSION");
pub const APP_CONF_PATH: &str = "doraemon.conf.json";

impl AppConf {
    pub fn new() -> Self {
        info!("conf init");
        Self {
            titlebar: !cfg!(target_os = "macos"),
            hide_dock_icon: false,
            stay_on_top: false,
            tray: true,
            theme: "light".to_string(),
            color_schema: "theme-blue".to_string(),
            lang: "zh-CN".to_string(),
            #[cfg(target_os = "macos")]
            speech_lang: "com.apple.eloquence.en-US.Rocko".into(),

            auto_update: "Prompt".to_string(),
            isinit: true,
            popup_search: false,
            main_close: false,
            main_dashboard: false,

            main_width: 1000.0,
            main_height: 720.0,

            show_welcome: true,
        }
    }

    pub fn file_path() -> PathBuf {
        app_root().join(APP_CONF_PATH)
    }

    pub fn read() -> Self {
        match std::fs::read_to_string(Self::file_path()) {
            Ok(v) => {
                if let Ok(s) = serde_json::from_str::<AppConf>(&v) {
                    s
                } else {
                    error!("conf_read_parse_error");
                    Self::default()
                }
            }
            Err(err) => {
                error!("conf_read_error: {}", err);
                Self::default()
            }
        }
    }

    pub fn write(self) -> Self {
        let path = &Self::file_path();
        if !path_exists(path) {
            create_file(path).unwrap();
            info!("conf_create");
        }

        if let Ok(v) = serde_json::to_string_pretty(&self) {
            std::fs::write(path, v).unwrap_or_else(|err| {
                error!("conf_create, {}", err);
                Self::default().write();
            })
        } else {
            error!("conf_ser");
        }

        self
    }

    pub fn amend(self, json: Value) -> Self {
        let val = serde_json::to_value(&self).unwrap();
        let mut config: BTreeMap<String, Value> = serde_json::from_value(val).unwrap();
        let new_json: BTreeMap<String, Value> = serde_json::from_value(json).unwrap();

        for (key, value) in new_json {
            config.insert(key, value);
        }

        match serde_json::to_string_pretty(&config) {
            Ok(v) => match serde_json::from_str::<AppConf>(&v) {
                Ok(v) => v,
                Err(err) => {
                    error!("conf_amend_parse: {}", err);
                    self
                }
            },
            Err(err) => {
                error!("conf_amend_str: {}", err);
                self
            }
        }
    }

    #[cfg(target_os = "macos")]
    pub fn titlebar(self) -> TitleBarStyle {
        if self.titlebar {
            TitleBarStyle::Transparent
        } else {
            TitleBarStyle::Overlay
        }
    }

    pub fn get_theme() -> String {
        Self::read().theme.to_lowercase()
    }

    pub fn theme_mode() -> Theme {
        match Self::get_theme().as_str() {
            "system" => match dark_light::detect() {
                // Dark mode
                dark_light::Mode::Dark => Theme::Dark,
                // Light mode
                dark_light::Mode::Light => Theme::Light,
                // Unspecified
                dark_light::Mode::Default => Theme::Light,
            },
            "dark" => Theme::Dark,
            _ => Theme::Light,
        }
    }

    pub fn get_color_schema() -> String {
        Self::read().color_schema
    }

    pub fn get_lang() -> String {
        Self::read().lang
    }

    pub fn get_platform() -> String {
        tauri::api::os::locale().unwrap()
    }

    pub fn restart(self, app: tauri::AppHandle) {
        tauri::api::process::restart(&app.env());
    }

    pub fn get_auto_update(self) -> String {
        self.auto_update.to_lowercase()
    }
}

impl Default for AppConf {
    fn default() -> Self {
        Self::new()
    }
}
