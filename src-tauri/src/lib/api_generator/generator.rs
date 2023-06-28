use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum ProjectConfig {
    SQLE,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ApiConfig {
    output_path: String,
    branch: String,
    project: ProjectConfig,
    swagger_path: String,
    token: String,
    is_handle_form_url_encoded_value: bool,
}

impl ApiConfig {
    fn parse_config() {}
}
