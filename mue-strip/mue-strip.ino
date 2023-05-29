#if __cplusplus > 199711L
#define register
#endif

#include <FastLED.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <WiFiUdp.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#include "MueStrip.h"

#define HTTP_PORT 8080
#define UDP_PORT 4210
#define NUM_LEDS 90
#define DATA_PIN 5
#define PACKET_SIZE 255

#define NODEMCU_LED_BUILTIN 2

/* HTTP Server*/
ESP8266WebServer server(HTTP_PORT);

/* UDP Socket */
WiFiUDP Udp;
char incomingPacket[PACKET_SIZE];
char replayPacket[] = "Hello World";

/* WiFiClient */
WiFiClient wifiClient;

/* FastLED*/
CRGB leds[NUM_LEDS];

struct Color
{
    int red;
    int green;
    int blue;
};

struct DeviceStatus
{
    bool is_connected;
    bool is_connecting;
    bool is_on;
    int brightness;
    Color color;
    char ip[13];
};

struct Device
{
    char *id = ID;
    char alias[32];
    char *type = "strip";
    DeviceStatus status;
};

/* Setup Device Status */
struct Color color = {
    .red = 10,
    .green = 10,
    .blue = 10,
};
struct Device device = {
    .id = ID,
    // alias
    // type
    .status = DeviceStatus{
        .is_connected = false,
        .is_connecting = true,
        .is_on = false,
        .brightness = 10,
        .color = Color{
            .red = 10,
            .green = 10,
            .blue = 10,
        }}};

void getHelloWorld()
{
    server.send(200, "text/json", "{\"name\": \"Hello world\"}");
}

void postInit()
{
    /* Check if arguments are valid */
    if (!server.hasArg("id") || !server.hasArg("color") || server.arg("id") != ID || server.arg("color") == NULL)
    {
        server.send(400, "text/plain", "400: Bad Request");
    }

    /* Parse color */
    char colorRawStr[12] = {
        '\0',
    };
    strcpy(colorRawStr, server.arg("color").c_str());
    int color[3] = {0, 0, 0};
    int colorCurPos = 0;
    char *ptr = strtok(colorRawStr, ",");

    while (ptr != NULL)
    {
        color[colorCurPos++] = atoi(ptr);
        ptr = strtok(NULL, ",");
    }

    setLED(color[0], color[1], color[2], 50);

    Serial.printf("ID: %s\n", server.arg("id").c_str());
    Serial.printf("Color: %d, %d, %d\n", color[0], color[1], color[2]);

    server.send(200, "text/plain", "Successfully Initialized");
}

void postSetDevice()
{
    char input[256];

    strcpy(input, server.arg("plain").c_str());

    size_t inputLength;
    StaticJsonDocument<192> doc;
    DeserializationError error = deserializeJson(doc, input, inputLength);

    if (error)
    {
        Serial.print(F("deserializeJson() failed: "));
        Serial.println(error.f_str());
        return;
    }

    // device.id = doc["id"];
    strncpy(device.alias, doc["alias"], 31);
    // device.type = doc["type"];

    JsonObject status = doc["status"];
    device.status.is_connected = status["is_connected"];
    device.status.is_connecting = status["is_connecting"];
    device.status.is_on = status["is_on"];
    device.status.brightness = status["brightness"];

    JsonObject status_color = status["color"];
    device.status.color.red = status_color["red"];
    device.status.color.green = status_color["green"];
    device.status.color.blue = status_color["blue"];
}

void handleNotFound()
{
    server.send(404, "text/plain", "404: Not found");
}

void setLED(int r, int g, int b, int brightness)
{
    for (int i = 0; i < NUM_LEDS; i++)
    {
        leds[i].setRGB((int)(r * (brightness / 100)), (int)(g * (brightness / 100)), (int)(b * (brightness / 100)));
    }
    FastLED.show();
}

void blink_builtin_led(int times)
{
    for (int i = 0; i < times; i++)
    {
        digitalWrite(NODEMCU_LED_BUILTIN, LOW);
        delay(150);
        digitalWrite(NODEMCU_LED_BUILTIN, HIGH);
        delay(150);
    }
}

void setup()
{
    /* Setup Device Info */
    strcpy(device.alias, "Mue Strip 1");

    /* Setup Builtin LED */
    pinMode(NODEMCU_LED_BUILTIN, OUTPUT);

    /* Setup Serial */
    Serial.begin(115200);
    Serial.println();

    /* Setup WiFi */
    Serial.printf("Connecting to %s", SSID);
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" connected");
    Serial.printf("IP address: %s\n\n", WiFi.localIP().toString().c_str());
    blink_builtin_led(4);

    /* Setup HTTP API Server */
    server.on("/helloworld", HTTP_GET, getHelloWorld);
    server.on("/init", HTTP_POST, postInit);
    server.on("/set_device", HTTP_POST, postSetDevice);
    server.onNotFound(handleNotFound);

    server.begin();
    Serial.printf("HTTP API Server started\n\n");
    blink_builtin_led(5);

    /* Setup UDP */
    Udp.begin(UDP_PORT);
    Serial.printf("Now listening at IP %s, UDP port %d\n", WiFi.localIP().toString().c_str(), UDP_PORT);
    strcpy(device.status.ip, WiFi.localIP().toString().c_str());
    blink_builtin_led(6);

    /* Setup LED*/
    FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);

    for (int i = 0; i < NUM_LEDS; i++)
    {
        leds[i].setRGB(10, 10, 10);
        Serial.printf("%dth LED Init\n", i);
    }
    FastLED.show();
    blink_builtin_led(7);
}

void loop()
{
    setLED(device.status.color.red, device.status.color.green, device.status.color.blue, device.status.brightness);
    FastLED.show();

    /* Connect to Backend Server */
    while (!device.status.is_connected)
    {
        HTTPClient http;
        http.begin(wifiClient, "http://192.168.219.112:8080/from_things/connect");
        http.addHeader("Content-Type", "application/json");

        /* Device Property */
        StaticJsonDocument<256> doc;

        doc["id"] = ID;
        doc["alias"] = device.alias;
        doc["type"] = device.type;

        JsonObject status = doc.createNestedObject("status");
        status["is_connected"] = device.status.is_connected;
        status["is_connecting"] = device.status.is_connecting;
        status["is_on"] = device.status.is_on;
        status["brightness"] = device.status.brightness;

        JsonObject status_color = status.createNestedObject("color");
        status_color["red"] = device.status.color.red;
        status_color["green"] = device.status.color.green;
        status_color["blue"] = device.status.color.blue;

        String output;
        serializeJson(doc, output);
        int httpCode = http.POST(output);
        String payload = http.getString();

        Serial.println(httpCode);
        Serial.println(payload);

        http.end();

        if (httpCode == 200)
        {
            device.status.is_connected = true;
            device.status.is_connecting = false;
            blink_builtin_led(8);
            break;
        }
        blink_builtin_led(9);
        delay(500);
    }
    int packetSize = Udp.parsePacket();
    if (packetSize)
    {
        /* receive incoming UDP packets */
        Serial.printf("Received %d bytes from %s, port %d\n", packetSize, Udp.remoteIP().toString().c_str(), Udp.remotePort());
        int len = Udp.read(incomingPacket, PACKET_SIZE);

        if (len > 0)
        {
            incomingPacket[len] = '\0';
        }
        Serial.printf("UDP packet contents: %s\n", incomingPacket);

        /* Send back a reply, to the IP address and port we got the packet from */
        Udp.beginPacket(Udp.remoteIP(), Udp.remotePort());
        Udp.write(replayPacket);
        Udp.endPacket();
    }

    /* handle HTTP API Server */
    server.handleClient();
}
