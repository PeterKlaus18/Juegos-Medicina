let puntos = 0;
let preguntasContestadas = 0;
let preguntas = [];  


fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        preguntas = data.preguntas;  
        mostrarBotonesCategorias();
    })
    .catch(error => console.error("Error al cargar las preguntas:", error));

function mostrarBotonesCategorias() {
    const botonesCategorias = document.getElementById('botonesCategorias');
    botonesCategorias.innerHTML = ''; 
    for (let i = 0; i < 5; i++) {
        const boton = document.createElement('button');
        boton.textContent = preguntas[i].dimensión;  
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

    
    const opciones = pregunta.opciones;
    for (let i = 0; i < 3; i++) {
        const respuestaBtn = document.getElementById('respuesta' + (i + 1));
        respuestaBtn.textContent = opciones[i].respuesta;
        respuestaBtn.onclick = function() { responder(opciones[i].puntos); };
    }

    
    document.getElementById('btn' + indice).disabled = true;
}

function responder(puntosRespuesta) {
    puntos += puntosRespuesta;
    preguntasContestadas++;

    
    if (preguntasContestadas === 5) {
        mostrarResultado();
    } else {
        document.getElementById('pregunta').style.display = 'none';
        document.getElementById('botonesCategorias').style.display = 'block';
    }
}

function mostrarResultado() {

    alert('¡Juego terminado! Tu puntuación es: ' + puntos);
    
    
    reiniciarJuego();
}

function reiniciarJuego() {
    puntos = 0;
    preguntasContestadas = 0;
    document.getElementById('juego').style.display = 'none';
    document.getElementById('inicio').style.display = 'block';
    document.getElementById('resultado').style.display = 'none';
    mostrarBotonesCategorias();  

    const botones = document.querySelectorAll('#botonesCategorias button');
    botones.forEach(boton => boton.disabled = false);
}


document.getElementById('startBtn').addEventListener('click', function() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('juego').style.display = 'block';
});


document.getElementById('reiniciarBtn').addEventListener('click', reiniciarJuego);
