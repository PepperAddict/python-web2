import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

chat = {"text": ''}
names = []
channels = []

@app.route("/")
def index():
    return render_template('index.html', names=names)

