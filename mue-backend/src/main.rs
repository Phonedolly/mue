use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
struct Color {
    red: u8,
    blue: u8,
    green: u8,
}

#[derive(Deserialize, Serialize)]
struct DeviceStatus {
    is_connected: bool,
    is_connecting: bool,
    is_on: bool,
    brightness: u8,
    color: Color,
    ip: String,
    // latency: u32,
}

#[derive(Deserialize, Serialize)]
enum DeviceType {
    Strip,
    Bulb,
    Play,
}

#[derive(Deserialize, Serialize)]
struct Device {
    id: String,
    alias: String,
    r#type: DeviceType,
    status: DeviceStatus,
}

#[derive(Serialize)]
struct Devices {
    devices: Vec<Device>,
}

#[post("/fromThings/connect")]
async fn connect(body: String) -> impl Responder {
    println!("{}", body);

    HttpResponse::Ok().body("OK")
}


#[get("/devices")]
async fn get_devices() -> web::Json<Devices> {
    let mut device_list = Vec::new();
    device_list.push(Device {
        id: "9cf80438-63f8-45a5-a348-2cd4bdc47f9a".to_string(),
        alias: "Living Room".to_string(),
        r#type: DeviceType::Strip,
        status: DeviceStatus {
            is_connected: true,
            is_connecting: false,
            is_on: true,
            brightness: 255,
            color: Color {
                red: 255,
                blue: 255,
                green: 255,
            },
            ip: "192.168.219.112".to_string(),
        },
    });

    let devices = Devices {
        devices: device_list,
    };

    web::Json(devices)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(get_devices).service(connect))
        .bind(("192.168.219.107", 8080))?
        .run()
        .await
}
