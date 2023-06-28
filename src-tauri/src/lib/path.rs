use std::{
    fs::{self, File},
    path::{Path, PathBuf},
};

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
