// script.js

// Función que coloca los iconos aleatoriamente en las celdas
function colocarIconos() {
    // Definir los iconos
    const manos = `<i class="fas fa-hand-paper"></i>`; // Ícono de mano
    const pies = `<div class="pie"></div>`;  // Ícono de pie como óvalo

    // Array de las celdas (puedes agregar más celdas si lo deseas)
    const celdas = [
        "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", 
        "cell-7", "cell-8", "cell-9", "cell-10", "cell-11", "cell-12", 
        "cell-13", "cell-14", "cell-15", "cell-16", "cell-17", "cell-18", 
        "cell-19", "cell-20", "cell-21", "cell-22", "cell-23", "cell-24"
    ];

    // Almacenamos las celdas ocupadas
    const celdasOcupadas = [];

    // Función para seleccionar una celda aleatoria
    function obtenerCeldaAleatoria() {
        let celdaAleatoria;
        do {
            const index = Math.floor(Math.random() * celdas.length);
            celdaAleatoria = celdas[index];
        } while (celdasOcupadas.includes(celdaAleatoria)); // Asegurarse de que no se repita
        return celdaAleatoria;
    }

    // Colocar las manos y pies aleatoriamente
    let manosColocadas = 0;
    let piesColocados = 0;

    // Colocar 2 manos
    while (manosColocadas < 2) {
        let celda = obtenerCeldaAleatoria();
        let elemento = document.getElementById(celda);
        if (!elemento.innerHTML) {  // Verifica si la celda está vacía
            elemento.innerHTML = manos;  // Coloca la mano
            celdasOcupadas.push(celda);  // Marca la celda como ocupada
            manosColocadas++;
        }
    }

    // Colocar 2 pies
    while (piesColocados < 2) {
        let celda = obtenerCeldaAleatoria();
        let elemento = document.getElementById(celda);
        if (!elemento.innerHTML) {  // Verifica si la celda está vacía
            elemento.innerHTML = pies;  // Coloca el pie
            celdasOcupadas.push(celda);  // Marca la celda como ocupada
            piesColocados++;
        }
    }

    // Desactivar el botón después de colocar todas las manos y pies
    document.querySelector("button").disabled = true;
    document.querySelector("button").innerText = "Ya están colocados";
}
