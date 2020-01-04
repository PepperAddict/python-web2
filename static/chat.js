document.addEventListener('DOMContentLoaded', () => {

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {

        // Each button should emit a "submit vote" event
        document.querySelectorAll('button').forEach(button => {
            button.onclick = (e) => {
                const msg = document.getElementById("chat");
                e.preventDefault();
                const name = localStorage.getItem('name')
                socket.emit('submit chat', {'message': name + ':' + msg.value});
                msg.value = ''
            };
        });

    });

    // When a new vote is announced, add to the unordered list
    socket.on('show chat', data => {
        console.log('received')
        const li = document.createElement('li');
        
        for (let it of data.message) {
            li.innerHTML = it
        }
        document.querySelector('#chatall').append(li)
    });
});