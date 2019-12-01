var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


//Este script solo es para actualizar las variables y enviar los datos al servidor
async function updateValues() {
    var xmlHttpArduino = new XMLHttpRequest();
    xmlHttpArduino.open("GET", "http://0.0.0.0:4000/updateArduinoValues", false); // false for synchronous request
    xmlHttpArduino.send(null);
    console.log("called")
}
setInterval(updateValues, 500);


async function sendPaquete1() {
    var xmlHttpArduino = new XMLHttpRequest();
    xmlHttpArduino.open("GET", "http://0.0.0.0:4000/sendPaquete1", false); // false for synchronous request
    xmlHttpArduino.send(null);
    console.log("something")
}
setInterval(sendPaquete1, 18);


async function sendPaquete2Arduino() {
    var xmlHttpArduino = new XMLHttpRequest();
    xmlHttpArduino.open("GET", "http://0.0.0.0:4000/sendPaquete2Arduino", false); // false for synchronous request
    xmlHttpArduino.send(null);
}
setInterval(sendPaquete2Arduino, 2700000);


async function senTemperatureSensors() {
    var xmlHttpArduino = new XMLHttpRequest();
    xmlHttpArduino.open("GET", "http://0.0.0.0:4000/senTemperatureSensors", false); // false for synchronous request
    xmlHttpArduino.send(null);
}
setInterval(senTemperatureSensors, 600000);


async function sendIrrSensor() {
    var xmlHttpArduino = new XMLHttpRequest();
    xmlHttpArduino.open("GET", "http://0.0.0.0:4000/sendIrrSensor", false); // false for synchronous request
    xmlHttpArduino.send(null);
}
setInterval(sendIrrSensor, 900000);

async function sendVictronData() {
    var xmlHttpArduino = new XMLHttpRequest();
    xmlHttpArduino.open("GET", "http://0.0.0.0:4000/sendVictronData", false); // false for synchronous request
    xmlHttpArduino.send(null);
}
setInterval(sendVictronData, 900000);
