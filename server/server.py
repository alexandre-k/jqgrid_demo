import json
import csv
from flask import Flask, jsonify
from flask_restful import Api, Resource
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS

app = Flask(__name__)
# app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)
api = Api(app)
# socketio = SocketIO(api)


class Data(Resource):
    
    def get(self):
        print('open file')
        with open('titanic.csv') as csvfile:
            data = csv.reader(csvfile, delimiter=',')
            print(dir(data))
            headers = next(data)
            headers[0] = 'Id'
            json_data = []
            for line in data:
                json_data.append(json.dumps(dict(list(zip(headers, line)))))
        return [json.loads(data) for data in json_data]

api.add_resource(Data, '/data')

# @socketio.on('message')
# def verify(msg):
#     print(msg)
#     print('WILL VERIFY CONNECTION')
#     send(msg)


if __name__ == '__main__':

    print('SOCKETIO APP RUNNING')
    app.run(debug=True)
