
let questions = {};

// Cargar preguntas desde questions.json
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data; // Guardamos las preguntas en la variable global
        console.log('Preguntas cargadas:', questions);
    })
    .catch(error => console.error('Error al cargar preguntas:', error));




function colocarIconos() {
    // Definir los botones de mano y pie
    const manos = `<button class="boton mano" onclick="manejarClick(this, 'mano')"><i class="fas fa-hand-paper"></i></button>`;
    const pies = `<button class="boton pie" onclick="manejarClick(this, 'pie')"><div class="pie"></div></button>`;

    // Array de las celdas
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

    // Colocar 2 manos
    let manosColocadas = 0;
    while (manosColocadas < 2) {
        let celda = obtenerCeldaAleatoria();
        let elemento = document.getElementById(celda);
        if (!elemento.innerHTML) {
            elemento.innerHTML = manos;  // Coloca la mano
            celdasOcupadas.push(celda);  // Marca la celda como ocupada
            manosColocadas++;
        }
    }

    // Colocar 2 pies
    let piesColocados = 0;
    while (piesColocados < 2) {
        let celda = obtenerCeldaAleatoria();
        let elemento = document.getElementById(celda);
        if (!elemento.innerHTML) {
            elemento.innerHTML = pies;  // Coloca el pie
            celdasOcupadas.push(celda);  // Marca la celda como ocupada
            piesColocados++;
        }
    }

    // Desactivar el botón después de colocar todas las manos y pies
    document.querySelector("#colocar-boton").disabled = true;
    document.querySelector("#colocar-boton").innerText = "Ya están colocados";
}

// Función para manejar el clic en los botones de mano o pie
function manejarClick(boton, tipo) {
    // Verificar que las preguntas estén cargadas
    if (Object.keys(questions).length === 0) {
        alert('Las preguntas aún no se han cargado. Por favor, intenta nuevamente.');
        return;
    }

    // Identificar el color de la casilla
    const casilla = boton.parentElement;
    const color = Array.from(casilla.classList).find(clase => ['amarillo', 'rojo', 'verde', 'azul'].includes(clase));

    if (!color) {
        alert('No se puede determinar el color de esta casilla.');
        return;
    }

    // Seleccionar la categoría de preguntas basada en el color
    let categoria;
    switch (color) {
        case 'amarillo':
            categoria = 'social';
            break;
        case 'rojo':
            categoria = 'fisico';
            break;
        case 'verde':
            categoria = 'academico';
            break;
        case 'azul':
            categoria = 'espiritual_emocional';
            break;
    }

    // Obtener una pregunta aleatoria de la categoría
    const preguntasCategoria = questions[categoria]?.[color] || [];
    if (preguntasCategoria.length === 0) {
        alert('No hay preguntas disponibles para esta categoría.');
        return;
    }

    const pregunta = preguntasCategoria[Math.floor(Math.random() * preguntasCategoria.length)];

    // Mostrar la pregunta al usuario
    if (confirm(pregunta)) {
        // Si el usuario presiona "Aceptar", elimina el botón
        boton.parentElement.innerHTML = "";  // Limpia el contenido de la celda

        // Verificar si todas las extremidades han sido eliminadas
        verificarVictoria();
    } else {
        // Si el usuario presiona "Cancelar", muestra una alerta
        alert("Selecciona otra extremidad");
    }
}

// Verificar si el jugador ha ganado
function verificarVictoria() {
    const botonesRestantes = document.querySelectorAll('.boton');
    if (botonesRestantes.length === 0) {
        alert('¡Felicidades! Has ganado el juego.');
        reiniciarTablero();
    }
}

// Reiniciar el tablero
function reiniciarTablero() {
    const celdas = document.querySelectorAll('.cell');
    celdas.forEach(celda => {
        celda.innerHTML = ""; // Limpia el contenido de todas las celdas
    });

    const botonColocar = document.querySelector('button');
    botonColocar.disabled = false;
    botonColocar.innerText = "Colocar Manos y Pies";
}