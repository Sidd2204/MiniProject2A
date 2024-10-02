function flip() {
  // Toggle visibility of the buttons
  const card = document.getElementById("flipCard");
  const buttonContainer = document.getElementById("buttonContainer");

  card.classList.toggle("is-flipped");
  buttonContainer.classList.toggle("show-buttons");
}
