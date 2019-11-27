from flask import Flask
from flask import request
from flask import jsonify
import requests as rq
import json
import random
import executer
from threading import Timer



app = Flask(__name__)
SERVER_URL =  "http://localhost:8080"


globalValuesArduino = {}
paquete1Arduino = {}
paquete2Arduino = {}
temperatureSensors = {}
irrSensor = {}

@app.route('/getArduinoValues', methods=['GET'])
def getView2():
    data  = json.dumps(globalValuesArduino)

    return data

@app.route('/getVictronValues')
def getView3():
    victronData = executer.x.show_data()
    
    
    data  = json.dumps(victronData)
    
    return data



@app.route("/updateArduinoValues")
def updateArduinoValues():
    if executer.s1.inWaiting() > 0:
        line = executer.s1.readline()
        if len(line) > 1:
            #print(x.show_data())
            arduinoValues = json.loads(executer.make_json(line))
            for  i in arduinoValues:
                if(i == "XDK_L" or i == "XDK_N" or i == "XDK_A" or i == "XDK_T" or i == "XDK_H"):                    
                    paquete1Arduino[i] = arduinoValues[i]
                elif(i == "XDK_AX" or i == "XDK_AY" or i == "XDK_AZ" or i == "XDK_GX" or i == "XDK_GY" or i == "XDK_GZ"):
                    paquete2Arduino[i] = arduinoValues[i]
                elif(i == "Temp1" or i == "Temp2" or i == "Temp3"):
                    temperatureSensors[i] = arduinoValues[i]
                elif(i == "IRR"):
                    irrSensor[i] = arduinoValues[i]
                globalValuesArduino[i] = arduinoValues[i]
    
    return "nice",200



def sendDataToServer(dataset):
    
    #r = rq.post(url = "http://localhost:8080/ceiba_data", data = {"data":json.dumps([{"measure":"s1","value":"-1"},{"measure":"s2","value":"-1"}])})
    r = rq.post(url = SERVER_URL+"/ceiba_data", data = {"data":json.dumps([{"measure":i, "value":dataset[i]} for i in dataset])})
    
    response = r.text 
    

if __name__ == '__main__':
    Timer(1800, sendDataToServer(paquete1Arduino)).start() # paquete1 30 minutos
    Timer(2700, sendDataToServer(paquete2Arduino)).start() # paquete2 45 minutos
    Timer(600, sendDataToServer(temperatureSensors)).start() # sensor temperatura 10 minutos
    Timer(900, sendDataToServer(irrSensor)).start() # sensor radiacion 15 minutos
    Timer(600, sendDataToServer(executer.x.show_data())).start() # sensores victron 10 minutos
    app.run(debug=True, port=4000, host='0.0.0.0')

    
