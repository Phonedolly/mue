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

struct Device
{
    char *id;
    bool isOn;
    bool isConnected;
    int brightness;
    char *type;
    struct Color color;
};

/* Setup Device Status */
struct Color color = {
    .red = 10,
    .green = 10,
    .blue = 10,
};
struct Device device = {
    .id = ID,
    .isOn = true,
    .isConnected = false,
    .brightness = 50,
    .type = "strip",
    .color = color,
};

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

    setLED(color[0], color[1], color[2]);

    Serial.printf("ID: %s\n", server.arg("id").c_str());
    Serial.printf("Color: %d, %d, %d\n", color[0], color[1], color[2]);

    server.send(200, "text/plain", "Successfully Initialized");
}

void handleNotFound()
{
    server.send(404, "text/plain", "404: Not found");
}

void setLED(int r, int g, int b)
{
    for (int i = 0; i < NUM_LEDS; i++)
    {
        leds[i].setRGB(r, g, b);
    }
    FastLED.show();
}

int r = 220;
int g = 30;
int b = 220;
void setup()
{
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

    /* Setup HTTP API Server */
    server.on("/helloworld", HTTP_GET, getHelloWorld);
    server.on("/init", HTTP_POST, postInit);
    server.onNotFound(handleNotFound);

    server.begin();
    Serial.printf("HTTP API Server started\n\n");

    /* Setup UDP */
    Udp.begin(UDP_PORT);
    Serial.printf("Now listening at IP %s, UDP port %d\n", WiFi.localIP().toString().c_str(), UDP_PORT);

    /* Setup LED*/
    FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);

    for (int i = 0; i < NUM_LEDS; i++)
    {
        leds[i].setRGB(10, 10, 10);
        Serial.printf("%d LED Setup\n", i);
    }
    FastLED.show();
}

void loop()
{
    for (int j = 0; j < 256; j++)
    {
        for (int i = 0; i < NUM_LEDS; i++)
        {
            // leds[i] = Scroll((i * 256 / NUM_LEDS + j) % 256);
            leds[i].setRGB(255, 74, 222);
        }

        FastLED.show();
    }
    // for (int i = 0; i < NUM_LEDS; i++)
    // {
    //     leds[i]=CRGB::HotPink;
    //     Serial.printf("%d LED Setup\n", i);
    // }
    // FastLED.show();

    // /* Connect Backend Server */
    // while (!device.isConnected)
    // {
    //     HTTPClient http;
    //     http.begin(wifiClient, "http://192.168.50.195:8080/fromThings/connect");
    //     http.addHeader("Content-Type", "application/json");

    //     /* Device Property */
    //     StaticJsonDocument<96> doc;

    //     doc["id"] = ID;
    //     doc["type"] = "strip";

    //     String output;
    //     serializeJson(doc, output);
    //     int httpCode = http.POST(output);
    //     String payload = http.getString();

    //     Serial.println(httpCode);
    //     Serial.println(payload);

    //     http.end();

    //     if (httpCode == 200)
    //     {
    //         device.isConnected = true;
    //         break;
    //     }
    //     delay(500);
    // }
    // int packetSize = Udp.parsePacket();
    // if (packetSize)
    // {
    //     /* receive incoming UDP packets */
    //     Serial.printf("Received %d bytes from %s, port %d\n", packetSize, Udp.remoteIP().toString().c_str(), Udp.remotePort());
    //     int len = Udp.read(incomingPacket, PACKET_SIZE);

    //     if (len > 0)
    //     {
    //         incomingPacket[len] = '\0';
    //     }
    //     Serial.printf("UDP packet contents: %s\n", incomingPacket);

    //     /* Send back a reply, to the IP address and port we got the packet from */
    //     Udp.beginPacket(Udp.remoteIP(), Udp.remotePort());
    //     Udp.write(replayPacket);
    //     Udp.endPacket();
    // }

    // /* handle HTTP API Server */
    // server.handleClient();
}

CRGB Scroll(int pos)
{
    CRGB color(0, 0, 0);
    if (pos < 85)
    {
        color.g = 70;
        color.r = ((float)pos / 85.0f) * 255.0f + 100;
        color.b = 255 - color.r + 100;
    }
    else if (pos < 170)
    {
        color.g = ((float)(pos - 85) / 85.0f) * 255.0f - 200;
        color.r = 255 - color.g + 100;
        color.b = 70;
    }
    else if (pos < 256)
    {
        color.b = ((float)(pos - 170) / 85.0f) * 255.0f;
        color.g = 255 - color.b - 200;
        // color.r = 1;
        color.r = 100;
    }
    return color;
}