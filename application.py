import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

chat = []
channels = {"general": []}

# @app.route("/")
# def index():
#     return render_template('index.html', names=names)

@app.route("/")
def chatroom():
    return render_template('chat.html', channels=channels, chat=chat)

@socketio.on('submit chat')
def socketChat(data):
    message = data["message"]
    chat.append(message)
    emit("show chat", {"message": chat}, channels, broadcast=True)

@socketio.on('submit channel')
def socketChannel(data):
    channel = data['channel']
    print('hello')
    emit('show channel', {'channel': channel}, channels, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)