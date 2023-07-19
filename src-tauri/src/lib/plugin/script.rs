use tauri::{plugin::Plugin, Invoke, Runtime};

use crate::lib::path::load_script;

pub struct ScriptPlugin<R: Runtime> {
    invoke_handler: Box<dyn Fn(Invoke<R>) + Send + Sync>,
    // plugin state, configuration fields
}

impl<R: Runtime> ScriptPlugin<R> {
    // you can add configuration fields here,
    // see https://doc.rust-lang.org/1.0.0/style/ownership/builders.html
    pub fn new() -> Self {
        Self {
            invoke_handler: Box::new(tauri::generate_handler![]),
        }
    }
}

impl<R: Runtime> Plugin<R> for ScriptPlugin<R> {
    /// The plugin name. Must be defined and used on the `invoke` calls.
    fn name(&self) -> &'static str {
        "script"
    }

    /// The JS script to evaluate on initialization.
    /// Useful when your plugin is accessible through `window`
    /// or needs to perform a JS task on app initialization
    /// e.g. "window.awesomePlugin = { ... the plugin interface }"
    fn initialization_script(&self) -> Option<String> {
        println!("gen_api.js content: {}", load_script("gen_api.js"));
        Some(String::from(r#"console.log('MyPlugin is initialized!')"#))
    }
}

pub async fn init_script(app: tauri::AppHandle) -> anyhow::Result<(), reqwest::Error> {}
