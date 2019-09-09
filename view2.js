var myVar = setInterval(view2Funct, 1000);
var d = new Date();
async function view2Funct() {
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://0.0.0.0:4000/getView2", false ); // false for synchronous request
    xmlHttp.send( null );
    
    data = JSON.parse(await xmlHttp.responseText)
    
    document.getElementById("horaView2").innerText = d.getHours();
    document.getElementById("fechaView2").innerText = d.getFullYear()+"/"+d.getMonth()+"/"+d.getDate()
    document.getElementById("radiacView2").innerText = data["radiacion"]
    document.getElementById("pressureView2").innerText = data["pressure"]
    document.getElementById("humedadView2").innerText = data["humedad"]
    document.getElementById("tempView2").innerText = data["temp"]
}

let toView1 = function(){
    window.location.replace('./view1.html');
}
let toView3 = function(){
    window.location.replace('./view3.html');
}



