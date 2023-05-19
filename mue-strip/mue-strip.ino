#include <FastLED.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>

#include "MueStrip.h"

#define NUM_LEDS 90
#define DATA_PIN 5
#define PACKET_SIZE 255

unsigned int localUdpPort = 4210;
char incomingPacket[PACKET_SIZE];
char replayPacket[] = "Hello World";

WiFiUDP Udp;

CRGB leds[NUM_LEDS];

void setup()
{
    /* Setup WiFi */
    Serial.begin(115200);
    Serial.println();

    Serial.printf("Connecting to %s", SSID);
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" connected");

    Udp.begin(localUdpPort);
    Serial.printf("Now listening at IP %s, UDP port %d\n", WiFi.localIP().toString().c_str(), localUdpPort);

    /* Setup LED*/
    FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);

    for (int i = 0; i < NUM_LEDS; i++)
    {
        leds[i].setRGB(10, 10, 10);
    }
    FastLED.show();
}

void loop()
{
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
}

// #include <Adafruit_NeoPixel.h>
// #ifdef __AVR__
// #include <avr/power.h>
// #endif
// #define PIN 5
// #define ACTUALPIXELS 90
// #define NUMPIXELS 144

// Adafruit_NeoPixel pixels(ACTUALPIXELS, PIN, NEO_ + NEO_KHZ800);

// void setup()
// {
//     // pinMode(PIN, OUTPUT);
//     pixels.begin();
// }

// void loop()
// {
//     for (int i = 0; i < ACTUALPIXELS; i++)
//     {
//         pixels.setPixelColor(i, pixels.Color(255, 255, 255));
//     }
//     // for (int i = ACTUALPIXELS; i < NUMPIXELS; i++)
//     // {
//     //     pixels.setPixelColor(i, pixels.Color(0, 0, 0, 0));
//     // }
//     pixels.show();
// }