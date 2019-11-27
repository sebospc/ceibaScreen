let toView2 = function(){
    window.location.replace('./variablesArduino.html');
}
let toView3 = function(){
    window.location.replace('./variablesVictron.html');
}

var myVar = setInterval(recolectInfo, 1000);


async function recolectInfo() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://0.0.0.0:4000/updateArduinoValues", false); // false for synchronous request
    xmlHttp.send(null);
}
