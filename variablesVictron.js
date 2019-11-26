
view3Funct();
var myVar = setInterval(view3Funct, 1000);
async function view3Funct() {
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://0.0.0.0:4000/getVictronValues", false ); // false for synchronous request
    xmlHttp.send( null );
    
    data = JSON.parse(await xmlHttp.responseText)
    
    document.getElementById("potenciaActual").innerText = data["potenciaActual"] + " W"
    document.getElementById("maximaPotencia").innerText = data["maximaPotencia"] +" W"
    document.getElementById("energiaGenerada").innerText = data["energiaGenerada"] +" kWh"
    document.getElementById("estadoBateria").innerText = data["estadoBateria"]
    document.getElementById("TiempoBateria").innerText = data["TiempoBateria"]+ " minutos"
    document.getElementById("porcentajeBattery").innerText = data["porcentajeBattery"] + " %"
    document.getElementById("valConsumoAC").innerText = data["valConsumoAC"] + " kW"
}

let toView1 = function(){
    window.location.replace('./about.html');
}
let toView2 = function(){
    window.location.replace('./variablesArduino.html');
}


