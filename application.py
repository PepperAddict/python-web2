import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

chat = []
names = []
channels = []

# @app.route("/")
# def index():
#     return render_template('index.html', names=names)

@app.route("/")
def chatroom():
    print('test')
    return render_template('chat.html')

@socketio.on('submit chat')
def socketChat(data):
    message = data["message"]
    chat.append(message)
    emit("show chat", {"message": chat}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)