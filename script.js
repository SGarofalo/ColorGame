//declaro las variables
let numSquares = 6;
let colors = [];
let pickedColor;
//selecciono los elementos del DOM y le asigno las var
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetBtn = document.querySelector("#reset");
let modeBtn = document.querySelectorAll(".mode");

init();
//llama a otras funciones para configurar: los botones de modo, los cuadros y reiniciar el juego
function init() {
  setUpModeBtns();
  setUpSquares();
  reset();
}
//configura los botones de modo: le agrego el evento click a cada boton que actualiza el num de cuadros y reinicia el juego
function setUpModeBtns() {
  for (let i = 0; i < modeBtn.length; i++) {
    modeBtn[i].addEventListener("click", function() {
      modeBtn[0].classList.remove("selected");
      modeBtn[1].classList.remove("selected");
      this.classList.add("selected");
      numSquares = this.textContent === "Easy" ? 3 : 6;
      reset();
    });
  }
}
//configura los eventos de click en cada cuadro: si se hace clic en un cuadro y su color coincide con el color seleccionado, se muestra un msj de "CORRECTO", se cambian los colores de los cuadros y se cambia el color de fondo del tit. si el color no coincide, se muestra un msj de "INTENTA NUEVAMENTE"
function setUpSquares() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      let clickedColor = this.style.background;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "CORRECT!";
        messageDisplay.style.fontWeight = "bold";
        resetBtn.textContent = "PLAY AGAIN!";
        changeColors(clickedColor);
        h1.style.background = clickedColor;
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "TRY AGAIN";
        messageDisplay.style.fontWeight = "bold";
      }
    });
  }
}
//reinicia el juego: nuevos colores, agrega otro color en RGB, actualiza los cuadros de color
function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.background = colors[i];
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
  }
  h1.style.background = "steelblue";
  messageDisplay.textContent = "";
  messageDisplay.style.fontWeight = "normal";
  resetBtn.textContent = "New Colors";
}

resetBtn.addEventListener("click", function() {
  reset();
});
//cambia el color de fondo de todos los cuadros al color correcto
function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
}
//selecciona aleatoriamente un color de la lista de colores q se genero
function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
//genera una lista de colores al azar, basado en el num de cuadros especificados
function generateRandomColors(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr[i] = randomColor();
  }
  return arr;
}
//genera un color RGB aleatorio
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}
