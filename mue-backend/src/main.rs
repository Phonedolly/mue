use std::{collections::HashMap, hash::Hash, ops::DerefMut, sync::Mutex};

use actix_web::{get, post, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug)]
struct Color {
    red: u8,
    blue: u8,
    green: u8,
}

#[derive(Deserialize, Serialize, Debug)]
struct DeviceStatus {
    is_connected: bool,
    is_connecting: bool,
    is_on: bool,
    brightness: u8,
    color: Color,
    ip: String,
    // latency: u32,
}

#[derive(Deserialize, Serialize, Debug)]
enum DeviceType {
    Strip,
    Bulb,
    Play,
}

#[derive(Deserialize, Serialize, Debug)]
struct Device {
    id: String,
    alias: String,
    r#type: DeviceType,
    status: DeviceStatus,
}

#[derive(Debug)]
struct DevicesState {
    devices: Mutex<HashMap<String, Device>>,
}
impl DevicesState {
    fn clone(self: &Self) -> Self {
        DevicesState {
            devices: 
        }
    }
}

#[derive(Deserialize, Debug)]
struct DeviceStatusFromArduino {
    id: String,
    r#type: String,
}

#[post("/fromThings/connect")]
async fn connect(
    body: web::Json<DeviceStatusFromArduino>,
    devices_state: web::Data<DevicesState>,
) -> impl Responder {
    println!("{:?}", body);
    println!("{:?}", devices_state);
    let mut devices = devices_state.devices.lock().unwrap();

    if devices.contains_key(&body.id) == false {
        devices.insert(
            body.id.clone(),
            Device {
                id: body.id.clone(),
                alias: "Strip1".to_string(),
                r#type: match body.r#type.as_str() {
                    "Strip" => DeviceType::Strip,
                    "Bulb" => DeviceType::Bulb,
                    "Play" => DeviceType::Play,
                    _ => DeviceType::Bulb,
                },
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
                    ip: "192.168.219.2".to_string(),
                },
            },
        );
        return HttpResponse::Ok().body("OK");
    } else {
        return HttpResponse::Ok().json(devices.get(&body.id).unwrap());
    }
}

// #[post("/fromFrontend/manipulate")]
// async fn manipulate(body: web::Json<Device>) -> impl Responder {}

#[get("/fromFrontend/devices")]
async fn get_devices(devices_state: web::Data<DevicesState>) -> web::Json<HashMap<String, Device>> {
    let devices_from_hash = devices_state.devices.lock().unwrap().clone();
    web::Json(devices_from_hash)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let devices_state = web::Data::new(DevicesState {
        devices: Mutex::new(HashMap::new()),
    });

    HttpServer::new(move || {
        App::new()
            .app_data(devices_state.clone())
            .service(get_devices)
            .service(connect)
    })
    .bind(("192.168.50.195", 8080))?
    .run()
    .await
}
