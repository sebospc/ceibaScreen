
view3Funct();
var myVar = setInterval(view3Funct, 300000);
async function view3Funct() {
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://0.0.0.0:4000/getVictronValues", false ); // false for synchronous request
    xmlHttp.send( null );
    
    data = JSON.parse(await xmlHttp.responseText)
    //Valores estaticos para pruebas deben ser cambiados por los nombres que ofrece victron
    document.getElementById("vSOC").innerText = "53" + " %"
    document.getElementById("vBatState").innerText = "Cargando"
    document.getElementById("vBatTime").innerText = 180 +" minutos"
    document.getElementById("vPowerOut").innerText = 2.5 +" kW"
    document.getElementById("vPower").innerText = 10+ " kW"
    document.getElementById("vMaxPower").innerText = 20 + " w"
    document.getElementById("vEnergyDay").innerText = 10 + " kWh"
    //document.getElementById("valConsumoAC").innerText = data["valConsumoAC"] + " kW"

    // update arduino values.
    var xmlHttpArduino = new XMLHttpRequest();
    xmlHttpArduino.open("GET", "http://0.0.0.0:4000/updateArduinoValues                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             ", false); // false for synchronous request
    xmlHttpArduino.send(null);
}

let toView1 = function(){
    window.location.replace('./about.html');
}
let toView2 = function(){
    window.location.replace('./variablesArduino.html');
}


