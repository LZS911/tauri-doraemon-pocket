use std::path::PathBuf;

use log::{error, info};
use serde::{Deserialize, Serialize};

#[cfg(target_os = "macos")]
use tauri::TitleBarStyle;

use super::path::{app_root, create_file, path_exists};

macro_rules! pub_struct {
    ($name:ident {$($field:ident: $t:ty,)*}) => {
      #[derive(Serialize, Deserialize, Debug, Clone)]
      pub struct $name {
        $(pub $field: $t),*
      }
    }
  }

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum Theme {
    Dark,
    Light,
}

pub_struct!(AppConf {
    titlebar: bool,
    hide_dock_icon: bool,

    theme: Theme,
    speech_lang: String,

    // Main Window
    isinit: bool,
    popup_search: bool,
    main_close: bool,
    main_dashboard: bool,
    main_width: f64,
    main_height: f64,

    //app conf
    username: String,
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
            theme: Theme::Light,
            #[cfg(target_os = "macos")]
            speech_lang: "com.apple.eloquence.en-US.Rocko".into(),
            #[cfg(not(target_os = "macos"))]
            speech_lang: "".into(),

            isinit: true,
            popup_search: false,
            main_close: false,
            main_dashboard: false,

            main_width: 1000.0,
            main_height: 720.0,

            username: "default user".to_string(),

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
}

impl Default for AppConf {
    fn default() -> Self {
        Self::new()
    }
}
