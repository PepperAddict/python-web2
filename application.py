import os

from flask import Flask, render_template, redirect
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels = {"general": []}
chosenChannel = "general"

# @app.route("/")
# def index():
#     return render_template('index.html', names=names)

@app.route("/")
def chatroom():
    return render_template('chat.html', chosen=channels, channels=channels[chosenChannel])

@socketio.on('submit chat')
def socketChat(data):
    message = data["message"]
    channel = data["channel"]
    channels[channel].append(message)
    emit("show chat", channels, broadcast=True)

@socketio.on('submit channel')
def socketChannel(data):
    channel = data['channel']
    channels[channel] = []
    emit('show channel', channels, broadcast=True)

@socketio.on('select channel')
def socketSelect(data):
    chosenChannel = data
    print(chosenChannel)
    
    return redirect('/')


if __name__ == '__main__':
    socketio.run(app)