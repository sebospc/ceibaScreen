from flask import Flask
from flask import request
from flask import jsonify
import json
import random
app = Flask(__name__)


@app.route('/getView2', methods=['GET'])
def getView2():
    data = {
        "radiacion":random.randint(1,100),
        "pressure":random.randint(1,100),
        "humedad":random.randint(1,100),
        "temp":random.randint(1,100)
    }
    return json.dumps(data)

@app.route('/getView3')
def getView3():
    data ={
        "valuePv": random.randint(1,100),
        "valueConsume": random.randint(1,100),
        "percentageVal": random.randint(1,100),
        "valSoc": random.randint(1,100),
        "valEqLight": random.randint(1,100),
        "valConsumoAC": random.randint(1,100)
    }
    return json.dumps(data)

if __name__ == '__main__':

    app.run(debug=True, port=4000, host='0.0.0.0')
    