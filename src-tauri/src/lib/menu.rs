use tauri::{AppHandle, CustomMenuItem, Manager, Menu, MenuItem, Submenu, WindowMenuEvent};

use super::{conf::AppConf, path, utils};

#[cfg(target_os = "macos")]
use tauri::AboutMetadata;

pub fn init() -> Menu {
    let app_conf = AppConf::read();
    let name = "DoraemonPocket";
    let app_menu = Submenu::new(
        name,
        Menu::with_items([
            #[cfg(target_os = "macos")]
            MenuItem::About(name.into(), AboutMetadata::default()).into(),
            #[cfg(not(target_os = "macos"))]
            CustomMenuItem::new("about", "About ChatGPT").into(),
            CustomMenuItem::new("check_update", "Check for Updates").into(),
            MenuItem::Services.into(),
            MenuItem::Hide.into(),
            MenuItem::HideOthers.into(),
            MenuItem::ShowAll.into(),
            MenuItem::Separator.into(),
            MenuItem::Quit.into(),
        ]),
    );

    let stay_on_top = CustomMenuItem::new("stay_on_top", "Stay On Top").accelerator("CmdOrCtrl+T");
    let stay_on_top_menu = if app_conf.stay_on_top {
        stay_on_top.selected()
    } else {
        stay_on_top
    };

    let update_prompt = CustomMenuItem::new("update_prompt", "Prompt");
    let update_silent = CustomMenuItem::new("update_silent", "Silent");

    #[cfg(target_os = "macos")]
    let titlebar = CustomMenuItem::new("titlebar", "Titlebar").accelerator("CmdOrCtrl+B");
    #[cfg(target_os = "macos")]
    let titlebar_menu = if app_conf.titlebar {
        titlebar.selected()
    } else {
        titlebar
    };

    let system_tray = CustomMenuItem::new("system_tray", "System Tray");
    let system_tray_menu = if app_conf.tray {
        system_tray.selected()
    } else {
        system_tray
    };

    let hide_dock_icon = CustomMenuItem::new("hide_dock_icon", "Hide Dock Icon");
    let hide_dock_icon_menu = if app_conf.tray {
        hide_dock_icon
    } else {
        hide_dock_icon.disabled()
    };

    let auto_update = app_conf.get_auto_update();

    let preferences_menu = Submenu::new(
        "Preferences",
        Menu::with_items([
            MenuItem::Separator.into(),
            stay_on_top_menu.into(),
            #[cfg(target_os = "macos")]
            titlebar_menu.into(),
            #[cfg(target_os = "macos")]
            hide_dock_icon_menu.into(),
            system_tray_menu.into(),
            MenuItem::Separator.into(),
            Submenu::new(
                "Auto Update",
                Menu::new()
                    .add_item(if auto_update == "prompt" {
                        update_prompt.selected()
                    } else {
                        update_prompt
                    })
                    .add_item(if auto_update == "silent" {
                        update_silent.selected()
                    } else {
                        update_silent
                    }),
            )
            .into(),
            MenuItem::Separator.into(),
            CustomMenuItem::new("go_conf", "Go to Config")
                .accelerator("CmdOrCtrl+Shift+G")
                .into(),
            CustomMenuItem::new("restart", "Restart ChatGPT")
                .accelerator("CmdOrCtrl+Shift+R")
                .into(),
            CustomMenuItem::new("clear_conf", "Clear Config").into(),
        ]),
    );

    let edit_menu = Submenu::new(
        "Edit",
        Menu::new()
            .add_native_item(MenuItem::Undo)
            .add_native_item(MenuItem::Redo)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Cut)
            .add_native_item(MenuItem::Copy)
            .add_native_item(MenuItem::Paste)
            .add_native_item(MenuItem::SelectAll),
    );

    let view_menu = Submenu::new(
        "View",
        Menu::new()
            .add_item(CustomMenuItem::new("go_back", "Go Back").accelerator("CmdOrCtrl+["))
            .add_item(CustomMenuItem::new("go_forward", "Go Forward").accelerator("CmdOrCtrl+]"))
            .add_item(
                CustomMenuItem::new("scroll_top", "Scroll to Top of Screen")
                    .accelerator("CmdOrCtrl+Up"),
            )
            .add_item(
                CustomMenuItem::new("scroll_bottom", "Scroll to Bottom of Screen")
                    .accelerator("CmdOrCtrl+Down"),
            )
            .add_native_item(MenuItem::Separator)
            .add_item(
                CustomMenuItem::new("zoom_0", "Zoom to Actual Size").accelerator("CmdOrCtrl+0"),
            )
            .add_item(CustomMenuItem::new("zoom_out", "Zoom Out").accelerator("CmdOrCtrl+-"))
            .add_item(CustomMenuItem::new("zoom_in", "Zoom In").accelerator("CmdOrCtrl+Plus"))
            .add_native_item(MenuItem::Separator)
            .add_item(
                CustomMenuItem::new("reload", "Refresh the Screen").accelerator("CmdOrCtrl+R"),
            ),
    );

    let window_menu = Submenu::new(
        "Window",
        Menu::new()
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Minimize)
            .add_native_item(MenuItem::Zoom),
    );

    let help_menu = Submenu::new(
        "Help",
        Menu::new()
            .add_item(CustomMenuItem::new("update_log", "Update Log"))
            .add_item(CustomMenuItem::new("report_bug", "Report Bug"))
            .add_item(
                CustomMenuItem::new("dev_tools", "Toggle Developer Tools")
                    .accelerator("CmdOrCtrl+Shift+I"),
            ),
    );

    Menu::new()
        .add_submenu(app_menu)
        .add_submenu(preferences_menu)
        .add_submenu(edit_menu)
        .add_submenu(view_menu)
        .add_submenu(window_menu)
        .add_submenu(help_menu)
}

pub fn menu_handler(event: WindowMenuEvent<tauri::Wry>) {
    let win = Some(event.window()).unwrap();
    let app = win.app_handle();
    let menu_id = event.menu_item_id();
    let menu_handle = win.menu_handle();

    match menu_id {
        "about" => {
            let tauri_conf = path::get_tauri_conf().unwrap();
            tauri::api::dialog::message(
                app.get_window("core").as_ref(),
                "DoraemonPocket",
                format!("Version {}", tauri_conf.package.version.unwrap()),
            );
        }
        "check_update" => {
            //todo
        }
        "restart" => tauri::api::process::restart(&app.env()),
        "go_conf" => path::open_file(path::app_root()),
        "clear_conf" => utils::clear_conf(&app),

        "hide_dock_icon" => {
            AppConf::read()
                .amend(serde_json::json!({ "hide_dock_icon": true }))
                .write()
                .restart(app);
        }
        "titlebar" => {
            let app_conf = AppConf::read();
            app_conf
                .clone()
                .amend(serde_json::json!({ "titlebar": !app_conf.titlebar }))
                .write()
                .restart(app);
        }
        "system_tray" => {
            let app_conf = AppConf::read();
            app_conf
                .clone()
                .amend(serde_json::json!({ "tray": !app_conf.tray }))
                .write()
                .restart(app);
        }
        "stay_on_top" => {
            let app_conf = AppConf::read();
            let stay_on_top = !app_conf.stay_on_top;
            menu_handle
                .get_item(menu_id)
                .set_selected(stay_on_top)
                .unwrap();
            win.set_always_on_top(stay_on_top).unwrap();
            app_conf
                .amend(serde_json::json!({ "stay_on_top": stay_on_top }))
                .write();
        }
        // View
        "zoom_0" => win.eval("window.__zoom0 && window.__zoom0()").unwrap(),
        "zoom_out" => win.eval("window.__zoomOut && window.__zoomOut()").unwrap(),
        "zoom_in" => win.eval("window.__zoomIn && window.__zoomIn()").unwrap(),
        "reload" => win.eval("window.location.reload()").unwrap(),
        "go_back" => win.eval("window.history.go(-1)").unwrap(),

        _ => (),
    }
}
