

var m_names = ["Enero", "Febrero", "Marzo",
    "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre",
    "Octubre", "Noviembre", "Diciembre"];

var d_names = ["Domingo", "Lunes", "Martes", "Miercoles",
    "Jueves", "Viernes", "Sabado"];
updateDate();
updateFrontArduino();
async function updateFrontArduino() {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://0.0.0.0:4000/getArduinoValues", false); // false for synchronous request
    xmlHttp.send(null);

    data = JSON.parse(await xmlHttp.responseText)


    
    document.getElementById("radiacView2").innerText = data["radiacion"];
    document.getElementById("pressureView2").innerText = data["pressure"] + " mbar";
    document.getElementById("humedadView2").innerText = data["humedad"] + " Humedad";
    document.getElementById("tempView2").innerText = data["temp"] + " Temp";
}

async function updateDate(){
    var myDate = new Date();
    myDate.setDate(myDate.getDate());
    var curr_date = myDate.getDate();
    var curr_month = myDate.getMonth();
    var curr_day = myDate.getDay();

    document.getElementById("fechaActual").innerText = d_names[curr_day] + "," + m_names[curr_month] + " " + curr_date+" de "+ myDate.getFullYear();
}

let toView1 = function () {
    window.location.replace('./about.html');
}
let toView3 = function () {
    window.location.replace('./variablesVictron.html');
}

var myVar = setInterval(recolectInfo, 1000);
var myVar = setInterval(updateFrontArduino, 5000);
var myVar = setInterval(updateDate, 5000);
async function recolectInfo() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://0.0.0.0:4000/updateArduinoValues", false); // false for synchronous request
    xmlHttp.send(null);
}



