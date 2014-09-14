#include <SoftwareSerial.h>
#define rxPin 10 // connect to TX of other device
#define txPin 11 // connect to RX of other device

int sensorPin = 2;    // select the input pin for the potentiometer
int sensorValue = 0;  // variable to store the value coming from the sensor
int oldSensorValue = 0;  // what was the last seen value

SoftwareSerial tesselBridge =  SoftwareSerial(rxPin, txPin);

void setup() {
  Serial.begin(9600);
  tesselBridge.begin(9600);
}

void loop() {
  // read the value from the sensor:
  // 0 = no pressure, 1 = pressure
  sensorValue = digitalRead(sensorPin);
  Serial.println(sensorValue);
  
  if (sensorValue != oldSensorValue) {
    // things have changed
    Serial.print("New sensor value = ");
    Serial.print(sensorValue);
    Serial.print("\n");
    tesselBridge.write(sensorValue);
    oldSensorValue = sensorValue;
    delay(1000); // to make sure we don't have false positives
  }
  // stop the program for <sensorValue> milliseconds:
  delay(100);
}

