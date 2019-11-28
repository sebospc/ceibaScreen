

var m_names = ["Ene", "Feb", "Mar",
    "Abr", "May", "Jun", "Jul", "Ago", "Sep",
    "Oct", "Nov", "Dic"];

var d_names = ["Domingo", "Lunes", "Martes", "Miercoles",
    "Jueves", "Viernes", "Sabado"];
updateDate();
updateFrontArduino();
async function updateFrontArduino() {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://0.0.0.0:4000/getArduinoValues", false); // false for synchronous request
    xmlHttp.send(null);

    data = JSON.parse(await xmlHttp.responseText)


    //Aveces pueden ser undefined
    document.getElementById("vRad").innerHtml = data["irr"]+" W/m"+"2".sup();
    document.getElementById("vPress").innerText = data["XDK_A"] + " mbar";
    document.getElementById("vHumidity").innerText = data["humedad"] + " Humedad";
    document.getElementById("vTemp").innerText = data["temp"] + " Temp";
    document.getElementById("vBulbCnt").innerText = "N años"; //* Acá se debe poner la ecuacion que hace la conversion enre energia consumida y el bombillo
    
}

async function updateDate(){
    var myDate = new Date();
    myDate.setDate(myDate.getDate());
    var curr_date = myDate.getDate();
    var curr_month = myDate.getMonth();
    var curr_day = myDate.getDay();

    document.getElementById("fechaActual").innerText = d_names[curr_day] + ", " + m_names[curr_month] + " " + curr_date+" de "+ myDate.getFullYear();
}

let toView1 = function () {
    window.location.replace('./about.html');
}
let toView3 = function () {
    window.location.replace('./variablesVictron.html');
}

setInterval(recolectInfo, 1000);
setInterval(updateFrontArduino, 60000);
setInterval(updateDate, 60000);
async function recolectInfo() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://0.0.0.0:4000/updateArduinoValues", false); // false for synchronous request
    xmlHttp.send(null);
}



