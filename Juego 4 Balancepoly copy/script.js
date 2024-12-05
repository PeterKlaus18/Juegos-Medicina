const casillaData = {
    1: { name: "Salida", color: "gray" },  
    2: { name: "Física", color: "fisica" },
    3: { name: "Espiritual", color: "espiritual" },
    4: { name: "Bienestar Comunal", color: "bienestar-comunal" },
    5: { name: "Social", color: "social" },
    6: { name: "Emocional", color: "emocional" },
    7: { name: "Descanso", color: "gray" }, 
    8: { name: "Académico", color: "academico" },
    9: { name: "Espiritual", color: "espiritual" },
    10: { name: "Física", color: "fisica" },
    11: { name: "Emocional", color: "emocional" },
    12: { name: "Avance Rápido", color: "gray" }, 
    13: { name: "Social", color: "social" },
    14: { name: "Académico", color: "academico" },
    15: { name: "Bienestar Comunal", color: "bienestar-comunal" },
    16: { name: "Física", color: "fisica" },
    17: { name: "Emocional", color: "emocional" },
    18: { name: "Descanso", color: "gray" }, 
    19: { name: "Espiritual", color: "espiritual" },
    20: { name: "Social", color: "social" },
    21: { name: "Emocional", color: "emocional" },
    22: { name: "Académico", color: "academico" }
};

const players = [
    { id: 1, name: 'Jugador 1', position: 1, piece: null, color: 'blue' },
    { id: 2, name: 'Jugador 2', position: 1, piece: null, color: 'green' },
    { id: 3, name: 'Jugador 3', position: 1, piece: null, color: 'orange' },
    { id: 4, name: 'Jugador 4', position: 1, piece: null, color: 'purple' }
];
let currentPlayerIndex = 0;

function initializeBoard() {
    const board = document.querySelector('.board');
    board.innerHTML = ''; 
    
    for (let i = 1; i <= 40; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.dimension = casillaData[i] ? casillaData[i].color : 'gray';
        cell.textContent = casillaData[i] ? casillaData[i].name : '';
        board.appendChild(cell);
    }
    
    players.forEach(player => {
        const piece = document.createElement('div');
        piece.classList.add('player-piece', player.color);
        player.piece = piece;
        document.querySelector('.board').appendChild(piece);
    });
    updatePlayerPosition();
}

function updatePlayerPosition() {
    players.forEach(player => {
        const cell = document.querySelectorAll('.cell')[player.position - 1];
        const piece = player.piece;
        const rect = cell.getBoundingClientRect();
        piece.style.top = `${rect.top + window.scrollY + rect.height / 2 - piece.offsetHeight / 2}px`;
        piece.style.left = `${rect.left + window.scrollX + rect.width / 2 - piece.offsetWidth / 2}px`;
    });
}

function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').textContent = `Resultado del dado: ${diceRoll}`;
    
    let currentPlayer = players[currentPlayerIndex];
    currentPlayer.position += diceRoll;
    
    if (currentPlayer.position > 40) {
        currentPlayer.position = currentPlayer.position - 40;
    }
    
    updatePlayerPosition();
    
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    document.getElementById('currentPlayer').textContent = `Turno del jugador: ${players[currentPlayerIndex].id + 1}`;
}

initializeBoard();