from flask import Flask
from flask import request
from flask import jsonify
import json
import random
import executer
app = Flask(__name__)

globalValuesArduino = {}
@app.route('/getView2', methods=['GET'])
def getView2():
    data  = json.dumps(globalValuesArduino)
    globalValuesArduino.clear()
    return data

@app.route('/getView3')
def getView3():
    data  = json.dumps(globalValuesArduino)
    globalValuesArduino.clear()
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

if __name__ == '__main__':

    app.run(debug=True, port=4000, host='0.0.0.0')
