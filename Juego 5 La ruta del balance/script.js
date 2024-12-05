let puntos = 0;
let preguntasContestadas = 0;
let preguntas = [];  // Array donde cargaremos las preguntas desde el JSON

// Cargar las preguntas desde el archivo JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        preguntas = data.preguntas;  // Guardamos las preguntas
        mostrarBotonesCategorias();
    })
    .catch(error => console.error("Error al cargar las preguntas:", error));

function mostrarBotonesCategorias() {
    const botonesCategorias = document.getElementById('botonesCategorias');
    botonesCategorias.innerHTML = ''; // Limpiar el contenedor antes de agregar los botones
    for (let i = 0; i < 5; i++) {
        const boton = document.createElement('button');
        boton.textContent = preguntas[i].dimensión;  // Muestra el nombre de la dimensión como texto del botón
        boton.id = 'btn' + i;
        boton.addEventListener('click', () => mostrarPregunta(i));
        botonesCategorias.appendChild(boton);
    }
}

function mostrarPregunta(indice) {
    const pregunta = preguntas[indice];
    document.getElementById('botonesCategorias').style.display = 'none';
    document.getElementById('pregunta').style.display = 'block';
    document.getElementById('textoPregunta').textContent = pregunta.pregunta;

    // Mostrar las opciones de respuesta
    const opciones = pregunta.opciones;
    for (let i = 0; i < 3; i++) {
        const respuestaBtn = document.getElementById('respuesta' + (i + 1));
        respuestaBtn.textContent = opciones[i].respuesta;
        respuestaBtn.onclick = function() { responder(opciones[i].puntos); };
    }

    // Deshabilitar el botón de la categoría después de ser presionado
    document.getElementById('btn' + indice).disabled = true;
}

function responder(puntosRespuesta) {
    puntos += puntosRespuesta;
    preguntasContestadas++;

    // Si ya respondió todas las preguntas
    if (preguntasContestadas === 5) {
        mostrarResultado();
    } else {
        document.getElementById('pregunta').style.display = 'none';
        document.getElementById('botonesCategorias').style.display = 'block';
    }
}

function mostrarResultado() {
    // Mostramos el resultado con un alert
    alert('¡Juego terminado! Tu puntuación es: ' + puntos);
    
    // Después del alert, reiniciamos el juego
    reiniciarJuego();
}

function reiniciarJuego() {
    puntos = 0;
    preguntasContestadas = 0;
    document.getElementById('juego').style.display = 'none';
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('resultado').style.display = 'none';
    mostrarBotonesCategorias();  // Volver a mostrar los botones de categoría
    // Habilitar todos los botones de categorías
    const botones = document.querySelectorAll('#botonesCategorias button');
    botones.forEach(boton => boton.disabled = false);
}

// Iniciar el juego
document.getElementById('startBtn').addEventListener('click', function() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
});

// Reiniciar el juego al presionar el botón de reiniciar
document.getElementById('reiniciarBtn').addEventListener('click', reiniciarJuego);
