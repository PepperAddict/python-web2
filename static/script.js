console.log("hello test");

//for name

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").onclick = e => {
    e.preventDefault();
    const name = document.getElementById("name");
    if (name.value) {
      localStorage.setItem("name", name.value);
      if (localStorage.getItem("name") !== null) {
      }
    } else {
      console.log("no");
    }

  };
});
