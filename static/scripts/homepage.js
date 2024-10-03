function logout() {
  let action = confirm("Are You Sure?");
  if (action) {
    window.location.href = "http://127.0.0.1:5000/";
  }
}

let submenu = document.getElementById("submenu");

function togglemenu() {
  submenu.classList.toggle("open-menu");
}
