use serde::{Deserialize, Serialize};

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
