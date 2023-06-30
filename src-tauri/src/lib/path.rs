use std::{
    fs::{self, File},
    path::{Path, PathBuf},
    process::Command,
};

use log::info;
use tauri::{Config, Manager};

pub fn path_exists(path: &Path) -> bool {
    Path::new(path).exists()
}

pub fn app_root() -> PathBuf {
    tauri::api::path::home_dir()
        .unwrap()
        .join(".doraemon-pocket")
}

pub fn create_file<P: AsRef<Path>>(filename: P) -> anyhow::Result<()> {
    let filename = filename.as_ref();

    // Check if parent directory exists, create it if not
    if let Some(parent) = filename.parent() {
        if !parent.exists() {
            fs::create_dir_all(parent)?;
        }
    }

    let mut file = File::create(filename)?;

    Ok(())
}

pub fn get_tauri_conf() -> Option<Config> {
    let config_file = include_str!("../../tauri.conf.json");
    let config: Config =
        serde_json::from_str(config_file).expect("failed to parse tauri.conf.json");
    Some(config)
}

pub fn convert_path(path_str: &str) -> String {
    if cfg!(target_os = "windows") {
        path_str.replace('/', "\\")
    } else {
        String::from(path_str)
    }
}

pub fn open_file(path: PathBuf) {
    let pathname = convert_path(path.to_str().unwrap());
    info!("open_file: {}", pathname);
    #[cfg(target_os = "macos")]
    Command::new("open")
        .arg("-R")
        .arg(pathname)
        .spawn()
        .unwrap();

    #[cfg(target_os = "windows")]
    Command::new("explorer.exe")
        .arg("/select,")
        .arg(pathname)
        .spawn()
        .unwrap();

    // https://askubuntu.com/a/31071
    #[cfg(target_os = "linux")]
    Command::new("xdg-open").arg(pathname).spawn().unwrap();
}
