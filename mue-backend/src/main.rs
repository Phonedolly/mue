use actix_web::{
    dev::PeerAddr, get, post, web, App, HttpRequest, HttpResponse, HttpServer, Responder,
};
use local_ip_address::local_ip;
use serde::{Deserialize, Serialize};
use std::{collections::HashMap, sync::Mutex};

#[derive(Deserialize, Serialize, Debug, Clone, Copy)]
struct Color {
    red: u8,
    blue: u8,
    green: u8,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
struct DeviceStatus {
    is_connected: bool,
    is_connecting: bool,
    is_on: bool,
    brightness: u8,
    color: Color,
    ip: String,
    // latency: u32,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
enum DeviceType {
    Strip,
    Bulb,
    Play,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
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

#[derive(Deserialize, Debug)]
struct DeviceInitStatusFromArduino {
    id: String,
    alias: String,
    r#type: String,
}

#[post("/from_things/connect")]
async fn connect(
    peer_addr: PeerAddr,
    body: web::Json<DeviceInitStatusFromArduino>,
    devices_state: web::Data<DevicesState>,
) -> impl Responder {
    println!("{:?}", peer_addr);
    println!("{:?}", body);
    println!("{:?}", devices_state);
    let mut devices = devices_state.devices.lock().unwrap();

    if devices.contains_key(&body.id) == false {
        devices.insert(
            body.id.clone(),
            Device {
                id: body.id.clone(),
                alias: body.alias.clone(),
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
                    ip: peer_addr.0.ip().to_string(),
                },
            },
        );
    }
    println!("{:?}", devices);
    HttpResponse::Ok().body("OK")
}

// #[post("/fromFrontend/manipulate")]
// async fn manipulate(body: web::Json<Device>) -> impl Responder {}

#[get("/from_frontend/get_devices")]
async fn get_devices(devices_state: web::Data<DevicesState>) -> web::Json<HashMap<String, Device>> {
    let devices_from_hash = devices_state.devices.lock().unwrap();
    let mut device_data_to_send = HashMap::new();
    for (key, value) in devices_from_hash.iter() {
        device_data_to_send.insert(key.clone(), value.clone());
    }
    web::Json(device_data_to_send)
}

#[get("/from_frontend/device/set_color")]
async fn set_color(
    payload: web::Json<Device>,
    devices_state: web::Data<DevicesState>,
) -> impl Responder {
    let device_id = payload.id.clone();
    let mut devices = devices_state.devices.lock().unwrap();

    if devices.contains_key(&device_id) == false {
        return HttpResponse::NotFound().body("Device not found");
    }
    devices.get_mut(&device_id).unwrap().status.color = payload.status.color;
    HttpResponse::Ok().json(devices.get(&device_id).unwrap())
}

#[get("/")]
async fn hello(req: HttpRequest) -> impl Responder {
    println!("{:?}", req);
    HttpResponse::Ok().body("Hello!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let my_local_ip = local_ip().unwrap();
    let devices_state = web::Data::new(DevicesState {
        devices: Mutex::new(HashMap::new()),
    });

    println!("My Local IP is {}, Port is {}", my_local_ip, 8080);

    HttpServer::new(move || {
        App::new()
            .app_data(devices_state.clone())
            .service(hello)
            .service(get_devices)
            .service(connect)
            .service(set_color)
    })
    .bind((my_local_ip, 8080))?
    .run()
    .await
}
