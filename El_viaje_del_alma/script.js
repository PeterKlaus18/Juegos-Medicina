const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const alma = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    radius: 30,
    color: 'lightblue'
};

const eyes = {
    xOffset: 10,
    yOffset: -10,
    eyeRadius: 5
};

let stations = [];
let questions = {};
const stationHeight = 100;
const stationSpacing = 300;
let positiveAnswers = 0;

let gameStarted = false;
let scrollSpeed = 2;

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error('Error al cargar el archivo JSON');
        const data = await response.json();
        questions = data.stations.reduce((acc, station) => {
            acc[station.title.toLowerCase()] = station.questions;
            return acc;
        }, {});
        console.log("Preguntas cargadas:", questions); 
    } catch (error) {
        console.error('Error al cargar las preguntas:', error);
    }
}

function initializeStations() {
    stations = [
        { name: "Emocional", color: "lightgreen" },
        { name: "Academico", color: "lightblue" },
        { name: "Fisico", color: "lightcoral" },
        { name: "Espiritual", color: "gold" },
        { name: "Social", color: "orange" }
    ].map((station, index) => ({
        ...station,
        x: canvas.width / 2 - 50,
        y: index * -stationSpacing,
        width: 100,
        height: stationHeight
    }));
}

function drawAlma() {
    
    ctx.beginPath();
    ctx.arc(alma.x, alma.y, alma.radius, 0, Math.PI * 2);
    ctx.fillStyle = alma.color;
    ctx.fill();
    ctx.closePath();

    
    ctx.beginPath();
    ctx.arc(alma.x - eyes.xOffset, alma.y + eyes.yOffset, eyes.eyeRadius, 0, Math.PI * 2);
    ctx.arc(alma.x + eyes.xOffset, alma.y + eyes.yOffset, eyes.eyeRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}

function drawStations() {
    stations.forEach(station => {
        ctx.fillStyle = station.color;
        ctx.fillRect(station.x, station.y, station.width, station.height);
        ctx.fillStyle = 'black';
        ctx.fillText(station.name, station.x + 10, station.y + station.height / 2);
    });
}

function getRandomQuestion(stationName) {
    const stationQuestions = questions[stationName.toLowerCase()];
    if (stationQuestions && stationQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * stationQuestions.length);
        return stationQuestions[randomIndex];
    }
    return "error en encontrar preguntas";
}

function updateStations() {
    stations.forEach(station => {
        station.y += scrollSpeed;
    });

    
    if (stations.length > 0 && alma.y - alma.radius < stations[0].y + stationHeight) {
        const currentStation = stations.shift();
        const question = getRandomQuestion(currentStation.name);
        const response = confirm(`Estación ${currentStation.name}: ${question}  Oprime "Aceptar" para afirmar y "cancelar" para negar.`);
        if (response) positiveAnswers++;

        if (stations.length === 0) {
            endGame();
        }
    }
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAlma();
    drawStations();
}

function updateScene() {
    if (!gameStarted) return;
    updateStations();
    drawScene();
    requestAnimationFrame(updateScene);
}

function startGame() {
    document.getElementById('ui').style.display = 'none';
    gameStarted = true;
    initializeStations();
    updateScene();
}

function endGame() {
    if (positiveAnswers >= 3) {
        alert("Felicitaciones, tu karma fue bueno en vida y lograste romper el ciclo y ascender!.");
    } else {
        alert("Lo siento, tendrás que reencarnar y vivir una vida mejor.");
    }
    restartGame();
}

function restartGame() {
    positiveAnswers = 0;
    gameStarted = false;
    document.getElementById('ui').style.display = 'block';
}


loadQuestions().then(() => drawScene());
