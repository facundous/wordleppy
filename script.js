let intentos = 6;
let palabras = ["ANGEL", "APPLE", "HOUSE", "ABIDE", "ADOBE", "AMPLE"];
let palabra;
let input;
let BOTON;
let primerIntento = false;

window.addEventListener('load', init);

function init() {
    palabra = seleccionar_palabra();
    input = document.getElementById("guess-input");
    BOTON = document.getElementById("guess-button");
    BOTON.disabled = true; 
    input.addEventListener('input', habilitarBoton);
}

function seleccionar_palabra() {
    let indice;
    do {
        indice = Math.floor(Math.random() * palabras.length);
    } while (palabras[indice] === "ANGEL" || palabras[indice] === "APPLE");
    return palabras[indice];
}

function leerIntento() {
    let intento = input.value;
    intento = intento.toUpperCase();
    return intento;
}

function intentar() {
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    const INTENTO = leerIntento();
    for (let i = 0; i < palabra.length; i++) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
    input.value = '';
    intentos--;
    if (!primerIntento) {
        primerIntento = true;
        BOTON.disabled = false;
    }
    if (intentos === 0) {
        terminar("Agotaste tus intentos. La palabra correcta era: " + palabra);
    } else if (INTENTO === palabra) {
        terminar("¡Felicidades! Has adivinado la palabra: " + palabra);
    }
}

function habilitarBoton() {
    BOTON.disabled = false;
}

function terminar(mensaje) {
    input.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
