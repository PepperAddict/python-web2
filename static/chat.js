document.addEventListener("DOMContentLoaded", () => {
  let name = localStorage.getItem("name");
  localStorage.setItem("channel", "general");

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
    };

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
  socket.on("connect", e => {

    //Chat
    if (name) {
      document.getElementById("submitChat").onclick = function(e) {
        const msg = document.getElementById("chat");
        e.preventDefault();
        const name = localStorage.getItem("name");
        const channel = localStorage.getItem("channel");
        socket.emit("submit chat", {
          message: name + ":" + msg.value,
          channel: channel
        });
        msg.value = "";
      };
    }

    //Managing adding a channel

    document.getElementById("submitChannel").onclick = function(e) {
      const chName = document.getElementById("channelAdd");
      e.preventDefault();
      socket.emit("submit channel", { channel: chName.value });
      chName.value = "";
    };

    //when channel is clicked save it to localstorage
    document.querySelectorAll("#channels").forEach(link => {
      link.onclick = e => {
        const channelSelected = e.target.innerHTML;
        localStorage.setItem("channel", channelSelected);
        changechannel(e);
        e.target.className = "active";
        socket.emit("select channel", channelSelected);
      };
    });
  });

  socket.on("show channel", data => {
    location.reload();
  });

  function changechannel(e) {
    document.querySelectorAll("#channels").forEach(el => {
      if (el.className == "active") {
        el.classList.remove("active");
      }
    });
  }

  //show current chat
  socket.on("show chat", data => {
    const pi = document.createElement("p");
    console.log(data)

    // for (let it of data) {
    //   pi.innerHTML = it;
    // }
    document.querySelector("#chatall").append(pi);
  });
});
