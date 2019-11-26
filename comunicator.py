from flask import Flask
from flask import request
from flask import jsonify
import requests as rq
import json
import random
import executer



app = Flask(__name__)
SERVER_URL =  "http://localhost"


globalValuesArduino = {}
globalValuesVictron = {}

@app.route('/getArduinoValues', methods=['GET'])
def getView2():
    data  = json.dumps(globalValuesArduino)

    return data

@app.route('/getVictronValues')
def getView3():
    print(executer.x.show_data())
    data  = json.dumps(globalValuesArduino)
    
    return data

@app.route('/updateVictronValues')
def updateVictronValues():
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
                globalValuesArduino[i] = arduinoValues[i]
    
    return "nice",200



def sendDataToServer(dataset):
    
    #r = rq.post(url = "http://localhost:8080/ceiba_data", data = {"data":json.dumps([{"measure":"s1","value":"-1"},{"measure":"s2","value":"-1"}])})
    r = rq.post(url = "http://localhost:8080/ceiba_data", data = {"data":json.dumps([{"measure":i, "value":dataset[i]} for i in dataset])})
    
    pastebin_url = r.text 
    print("The pastebin URL is:%s"%pastebin_url) 


if __name__ == '__main__':
    app.run(debug=True, port=4000, host='0.0.0.0')
