let confirmCheckbox = document.getElementById("confirm");
confirmCheckbox.addEventListener("click", proceedButton);

function proceedButton() {
  let button = document.querySelector("button");
  button = button.classList.toggle("proceed-button");
} // cambia la classe al button

function proceed() {
  if (confirmCheckbox.checked) {
    window.location.href = "bw1Question.html";
  } // indirizza alla pagina delle domande
}
