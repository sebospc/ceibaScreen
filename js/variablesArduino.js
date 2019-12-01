

var m_names = ["Ene", "Feb", "Mar",
    "Abr", "May", "Jun", "Jul", "Ago", "Sep",
    "Oct", "Nov", "Dic"];

var d_names = ["Domingo", "Lunes", "Martes", "Miercoles",
    "Jueves", "Viernes", "Sabado"];
updateDate();
updateFrontArduino();

// esta funcion actualiza los datos que se muestran en la vista de las variables externas
async function updateFrontArduino() {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://0.0.0.0:4000/getArduinoValues", false); // false for synchronous request
    xmlHttp.send(null);

    data = JSON.parse(await xmlHttp.responseText)


    //Aveces pueden ser undefined
    if(data["irr"] !== undefined )
        document.getElementById("vRad").innerHtml = data["irr"]+" W/m"+"2".sup();
    if(data["XDK_A"] !== undefined )
        document.getElementById("vPress").innerText = data["XDK_A"] + " mbar";
    if(data["humedad"] !== undefined )
        document.getElementById("vHumidity").innerText = data["humedad"] + " Humedad";
    if(data["temp"] !== undefined )
        document.getElementById("vTemp").innerText = data["temp"] + " Temp";
    
    document.getElementById("vBulbCnt").innerText = "N años"; //* Acá se debe poner la ecuacion que hace la conversion entre energia consumida y el bombillo
    
}


setInterval(updateFrontArduino, 60000);


//Esta funcion actualiza la fecha que se muestra en la pantalla
async function updateDate(){
    var myDate = new Date();
    myDate.setDate(myDate.getDate());
    var curr_date = myDate.getDate();
    var curr_month = myDate.getMonth();
    var curr_day = myDate.getDay();

    document.getElementById("fechaActual").innerText = d_names[curr_day] + ", " + m_names[curr_month] + " " + curr_date+" de "+ myDate.getFullYear();
}
setInterval(updateDate, 60000);
let toView1 = function () {
    window.location.replace('./about.html');
}
let toView3 = function () {
    window.location.replace('./variablesVictron.html');
}



