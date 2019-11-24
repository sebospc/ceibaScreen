
var myVar = setInterval(view3Funct, 1000);
async function view3Funct() {
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://0.0.0.0:4000/getView3", false ); // false for synchronous request
    xmlHttp.send( null );
    
    data = JSON.parse(await xmlHttp.responseText)
    
    document.getElementById("valuePv").innerText = data["valuePv"] + " PW"
    document.getElementById("valueConsume").innerText = data["valueConsume"] +" PW"
    document.getElementById("percentageVal").innerText = data["percentageVal"]
    document.getElementById("valSoc").innerText = data["valSoc"]+" SoC"
    document.getElementById("valEqLight").innerText = data["valEqLight"]+ "Eq light"
    document.getElementById("valConsumoAC").innerText = data["valConsumoAC"] + "consumo AC"
}

let toView1 = function(){
    window.location.replace('./about.html');
}
let toView2 = function(){
    window.location.replace('./variablesArduino.html');
}


