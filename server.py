from collections import OrderedDict
from datetime import datetime
import json
from threading import Thread
import time

# import pydantic
import flask

from flask_cors import CORS
from flask_socketio import SocketIO

app = flask.Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

send_thread = None


@app.route("/data", methods=["GET"])
def data():
    data_file = "data.json"
    with open(data_file, "r") as f:
        data = json.load(f)
    return flask.jsonify(data)


def send_data():
    while True:
        # Simulating some data generation
        data_file = "data.json"
        with open(data_file, "r") as f:
            data = json.load(f)

        socketio.emit("data", data)
        time.sleep(0.001)


@socketio.on("connect")
def handle_connect():
    global send_thread
    print("Client connected")

    # send_data()
    if send_thread is None:
        # just one for server
        send_thread = Thread(target=send_data)
        send_thread.start()


# run the application
if __name__ == "__main__":
    # app.run(debug=True, host="0.0.0.0", port=11000)
    socketio.run(app, debug=True, host="0.0.0.0", port=11000)

"""
# test
data_file = "test_data.json"
with open(data_file, "r") as f:
    data = json.load(f)
data_file = "data.json"
import copy

new_data = copy.deepcopy(data)
for k, v in data.items():
    if k == "skeletons":
        new_data[k] = []
        for i in range(len(v)):
            sk = v[i]
            new_joints = []
            for joint in sk["joints"]:
                new_joints.append(
                    {
                        "x": joint[0],
                        "y": joint[1],
                        "z": joint[2],
                    }
                )
            new_colors = []
            for color in sk["colors"]:
                new_colors.append(
                    {
                        "r": color[0],
                        "g": color[1],
                        "b": color[2],
                    }
                )

            sk["joints"] = new_joints
            sk["colors"] = new_colors
            new_data[k].append(sk)

    if k == "points":
        new_data[k] = []
        for i in range(len(v)):
            new_data[k].append({"x": v[i][0], "y": v[i][1], "z": v[i][2]})

with open(data_file, "w") as f:
    json.dump(new_data, f, indent=4)
"""
