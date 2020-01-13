document.addEventListener("DOMContentLoaded", () => {
  let name = localStorage.getItem("name");

  if (!name) {
    const ele = document.getElementById("nameormsg");
    const pi = document.createElement("input");
    const labelname = document.createElement("label");
    labelname.innerHTML = "Enter a name";
    pi.placeholder = "enter your name";

    //button
    const buttonOne = document.createElement("button");
    buttonOne.type = "submit";
    // localStorage.setItem("name", name.value);
    buttonOne.innerHTML = "Enter Name";

    buttonOne.onclick = function(e) {
        localStorage.setItem("name", pi.value);
    }

    ele.append(labelname);
    ele.append(pi);
    ele.append(buttonOne);
  } else {
    const ele = document.getElementById("nameormsg");
    const pi = document.createElement("input");
    pi.id = "chat";
    pi.name = "chat";
    pi.placeholder = "enter a message";

    //button
    const buttonTwo = document.createElement("button");
    buttonTwo.id = "submitChat";
    buttonTwo.innerHTML = "Submit Chat";

    ele.append(pi);
    ele.appendChild(buttonTwo);
  }

  // Connect to websocket
  var socket = io.connect(
    location.protocol + "//" + document.domain + ":" + location.port
  );

  // When connected, configure buttons
  socket.on("connect", () => {
    // Each button should emit a "submit vote" event
    if (name) {
      document.getElementById("submitChat").onclick = function(e) {
        const msg = document.getElementById("chat");
        e.preventDefault();
        const name = localStorage.getItem("name");
        socket.emit("submit chat", { message: name + ":" + msg.value });
        msg.value = "";
      };
    }

    // document.getElementById('submitChannel').onclick = function(e) {
    //   const chName = document.getElementById('channelAdd');
    //   e.preventDefault();
    //   socket.emit('submit channel', {channel: chName.value});
    //   chName.value = "";
    // }
  });

  // When a new vote is announced, add to the unordered list
  socket.on("show chat", data => {
    const pi = document.createElement("p");

    for (let it of data.message) {
      pi.innerHTML = it;
    }
    document.querySelector("#chatall").append(pi);
  });

  // socket.on('show channel', data => {
  //   console.log(data);

  // })
});
