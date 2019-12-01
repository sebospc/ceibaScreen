from flask import Flask
from flask import request
from flask import jsonify
import requests as rq
import json
import random
import executer




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



#Está función se debe llamar para leer los datos que envia arduino por la tubería
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
    

#Esta función es llama cada 30 minutos -> 1800000 milisegundos 
@app.route("/sendPaquete1")
def sendPaquete1():
    sendDataToServer(paquete1Arduino)
    return "nice",200

#Esta función se llama cada 45 minutos -> 2700000 milisegundos
@app.route("/sendPaquete2Arduino")
def sendPaquete2Arduino():
    sendDataToServer(paquete2Arduino)
    return "nice",200

#Esta funcion se llama cada 10 minutos -> 600000 milisegundos
@app.route("/senTemperatureSensors")
def senTemperatureSensors():
    sendDataToServer(temperatureSensors)
    return "nice",200

#Esta funcion se llama cada 15 minutos -> 900000 milisegundos
@app.route("/sendIrrSensor")
def sendIrrSensor():
    sendDataToServer(irrSensor)
    return "nice",200

# Se envía sensores victron 10 minutos -> 600000 milisegundos
@app.route("/sendVictronData")
def sendVictronData():
    sendDataToServer(executer.x.show_data())
    return "nice",200

if __name__ == '__main__':

    app.run(debug=True, port=4000, host='0.0.0.0')

    
