// Datos de las dimensiones de las casillas (colores y nombres)
const casillaData = {
    1: { name: "Salida", color: "gray" },  // Casilla 1 llamada "Salida" y color gris
    2: { name: "Física", color: "fisica" },
    3: { name: "Espiritual", color: "espiritual" },
    4: { name: "Bienestar Comunal", color: "bienestar-comunal" },
    5: { name: "Social", color: "social" },
    6: { name: "Emocional", color: "emocional" },
    7: { name: "Descanso", color: "gray" }, // Casilla 7 es un descanso, color gris
    8: { name: "Académico", color: "academico" },
    9: { name: "Espiritual", color: "espiritual" },
    10: { name: "Física", color: "fisica" },
    11: { name: "Emocional", color: "emocional" },
    12: { name: "Avance Rápido", color: "gray" }, // Casilla 12 es "Avance Rápido", color gris
    13: { name: "Social", color: "social" },
    14: { name: "Académico", color: "academico" },
    15: { name: "Bienestar Comunal", color: "bienestar-comunal" },
    16: { name: "Física", color: "fisica" },
    17: { name: "Emocional", color: "emocional" },
    18: { name: "Descanso", color: "gray" }, // Casilla 18 es un descanso, color gris
    19: { name: "Espiritual", color: "espiritual" },
    20: { name: "Social", color: "social" },
    21: { name: "Emocional", color: "emocional" },
    22: { name: "Académico", color: "academico" }
};

// Definir jugadores (4 jugadores)
const players = [
    { id: 1, name: 'Jugador 1', position: 1, piece: null, color: 'blue' },
    { id: 2, name: 'Jugador 2', position: 1, piece: null, color: 'green' },
    { id: 3, name: 'Jugador 3', position: 1, piece: null, color: 'orange' },
    { id: 4, name: 'Jugador 4', position: 1, piece: null, color: 'purple' }
];

let currentPlayerIndex = 0;

// Definir el tablero de juego (con las posiciones válidas)
const boardMatrix = [
    [12, 13, 14, 15, 16, 17, 18],
    [11, 0, 0, 0, 0, 0, 19],
    [10, 0, 0, 0, 0, 0, 20],
    [9, 0, 0, 0, 0, 0, 21],
    [8, 0, 0, 0, 0, 0, 22],
    [7, 6, 5, 4, 3, 2, 1]
];

// Obtener las casillas válidas (sin ceros) para el movimiento
const validCells = [];
for (let row = 0; row < boardMatrix.length; row++) {
    for (let col = 0; col < boardMatrix[row].length; col++) {
        const cellValue = boardMatrix[row][col];
        if (cellValue !== 0) {
            validCells.push(cellValue); // Solo agregamos las casillas válidas (no cero)
        }
    }
}

// Generar el tablero en el HTML
function generateBoard() {
    const board = document.querySelector('.board');

    // Recorremos la matriz y agregamos las casillas al tablero
    for (let row = 0; row < boardMatrix.length; row++) {
        for (let col = 0; col < boardMatrix[row].length; col++) {
            const cellValue = boardMatrix[row][col];

            if (cellValue !== 0) {
                // Crear una casilla solo si no es un 0
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.id = `cell-${cellValue}`;

                // Asignar el data-dimension a la casilla según la dimensión
                if (casillaData[cellValue]) {
                    cell.setAttribute('data-dimension', casillaData[cellValue].color);
                    cell.textContent = casillaData[cellValue].name;
                }

                // Crear un contenedor para las piezas de los jugadores
                const cellPlayers = document.createElement('div');
                cellPlayers.classList.add('cell-players');
                cell.appendChild(cellPlayers);

                board.appendChild(cell);
            } else {
                const emptyCell = document.createElement('div');
                emptyCell.classList.add('cell');
                emptyCell.style.border = 'none'; // Asegurarnos de que no tenga borde
                board.appendChild(emptyCell);
            }
        }
    }
}

// Crear las piezas de los jugadores
function createPlayerPieces() {
    players.forEach(player => {
        const piece = document.createElement('div');
        piece.classList.add('player-piece');
        piece.style.backgroundColor = player.color;
        piece.id = `player-${player.id}`;
        player.piece = piece;

        // Inicialmente, coloca las piezas sobre la casilla 1 (salida)
        const startCell = document.getElementById('cell-1').querySelector('.cell-players');
        startCell.appendChild(piece);
    });
}

// Función para lanzar el dado
function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Lanzar el dado (1-6)
    const currentPlayer = players[currentPlayerIndex];
    const oldPosition = currentPlayer.position;

    // Sumar el valor del dado a la posición actual del jugador en la lista de casillas válidas
    let newPositionIndex = validCells.indexOf(currentPlayer.position) + diceRoll;
    
    // Si la nueva posición se pasa del límite, se ajusta a la última casilla válida
    if (newPositionIndex >= validCells.length) {
        newPositionIndex = validCells.length - 1;
    }

    currentPlayer.position = validCells[newPositionIndex]; // Establecer la nueva posición

    // Mover la pieza a la nueva casilla
    const newCellId = `cell-${currentPlayer.position}`;
    const newCell = document.getElementById(newCellId).querySelector('.cell-players');

    // Colocamos la pieza en la nueva casilla
    const piece = currentPlayer.piece;
    newCell.appendChild(piece);

    // Eliminar la pieza de la casilla anterior
    const oldCell = document.getElementById(`cell-${oldPosition}`).querySelector('.cell-players');
    oldCell.removeChild(piece);

    // Mostrar el resultado del dado
    document.getElementById('diceResult').textContent = `Resultado del dado: ${diceRoll}`;

    // Actualizar el turno del jugador
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Cambiar de jugador
    document.getElementById('currentPlayer').textContent = `Turno del jugador: ${currentPlayerIndex + 1}`;
}

// Inicializar el tablero y las piezas
generateBoard();
createPlayerPieces();
