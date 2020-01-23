import os

from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit
from flask_session import Session

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SESSION_TYPE'] = 'filesystem'
socketio = SocketIO(app, manage_session=False)

channels = {'general': []}
chosenChannel = 'general'

# Configure session to use filesystem
app.config['SESSION_PERMANENT'] = False

Session(app)


@app.route('/')
def chatroom():
    chan = session.get('channel', 'general')
    print(chan)
    return render_template('chat.html', channels=channels, chat=channels[chan])

@socketio.on('submit chat')
def socketChat(data):
    message = data['message']
    channel = data['channel']
    channels[channel].append(message)
    emit('show chat', { 'channel': channel, 'message': channels[channel]}, broadcast=True)

@socketio.on('submit channel')
def socketChannel(data):
    channel = data['channel']
    session['channel'] = channel
    cha = session.get('channel')
    channels[channel] = []
    emit('show channel', cha, broadcast=True)

@socketio.on('select channel')
def socketSelect(data):
    session['channel'] = data
    cha = session.get('channel')
    emit('select channel', cha, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)