
var myVar = setInterval(view3Funct, 1000);
async function view3Funct() {
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://0.0.0.0:4000/getView3", false ); // false for synchronous request
    xmlHttp.send( null );
    
    data = JSON.parse(await xmlHttp.responseText)
    
    document.getElementById("valuePv").innerText = data["valuePv"]
    document.getElementById("valueConsume").innerText = data["valueConsume"]
    document.getElementById("percentageVal").innerText = data["percentageVal"]
    document.getElementById("valSoc").innerText = data["valSoc"]
    document.getElementById("valEqLight").innerText = data["valEqLight"]
    document.getElementById("valConsumoAC").innerText = data["valConsumoAC"]
}

let toView1 = function(){
    window.location.replace('./view1.html');
}
let toView2 = function(){
    window.location.replace('./view2.html');
}


