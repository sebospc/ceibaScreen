var myVar = setInterval(view2Funct, 5000);
var d = new Date();
async function view2Funct() {
    console.log("Something")
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://0.0.0.0:4000/getView2", false ); // false for synchronous request
    xmlHttp.send( null );
    
    data = JSON.parse(await xmlHttp.responseText)
    
    console.log(data)
    
    document.getElementById("horaView2").innerText = d.getHours();
    document.getElementById("fechaView2").innerText = d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate();
    document.getElementById("radiacView2").innerText = data["radiacion"];
    document.getElementById("pressureView2").innerText = data["pressure"]+" mbar";
    document.getElementById("humedadView2").innerText = data["humedad"]+" Humedad";
    document.getElementById("tempView2").innerText = data["temp"]+" Temp";
}

let toView1 = function(){
    window.location.replace('./about.html');
}
let toView3 = function(){
    window.location.replace('./variablesVictron.html');
}

var myVar = setInterval(recolectInfo, 1000);
async function recolectInfo(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://0.0.0.0:4000/updateArduinoValues", false ); // false for synchronous request
    xmlHttp.send( null );
}



