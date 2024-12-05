
const playerPositions = [1, 1, 1, 1]; 

const players = [
    { element: document.querySelector('.player1'), position: 1 },
    { element: document.querySelector('.player2'), position: 1 },
    { element: document.querySelector('.player3'), position: 1 },
    { element: document.querySelector('.player4'), position: 1 },
];


const cells = Array.from(document.querySelectorAll('.cell'));


let questions = {};


fetch('preguntas_tablero.json')
    .then(response => response.json())
    .then(data => {
        questions = data;  
    })
    .catch(error => console.error('Error al cargar preguntas:', error));


function movePlayer(player, newPosition) {
    const oldCell = document.getElementById(`cell-${player.position}`);
    const newCell = document.getElementById(`cell-${newPosition}`);

    
    const oldPlayerElement = oldCell.querySelector('.player');
    if (oldPlayerElement) {
        oldCell.removeChild(oldPlayerElement);
    }


    newCell.appendChild(player.element);
    player.position = newPosition;


    if (newPosition === 23) {
        alert(`¡El Jugador ${players.indexOf(player) + 1} ha ganado!`);
        endGame();
    }
}


function showQuestion(cell, player) {
    const color = cell.classList[1]; 

    if (questions[color]) {
        
        const randomQuestion = questions[color][Math.floor(Math.random() * questions[color].length)];
        
        
        alert(`Jugador ${players.indexOf(player) + 1}, debes responder la siguiente pregunta sobre ${color}: ${randomQuestion}`);
    }
}


let turn = 1; 
function rollDice() {
    const currentPlayerIndex = (turn - 1) % 4; 
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').textContent = `Resultado del dado: ${diceRoll}`;

    
    const currentPlayer = players[currentPlayerIndex];
    const newPosition = currentPlayer.position + diceRoll;

    if (newPosition <= 23) {
        
        movePlayer(currentPlayer, newPosition);

        
        setTimeout(() => {
            const newCell = document.getElementById(`cell-${newPosition}`);
            showQuestion(newCell, currentPlayer);
        }, 300); 

        
        turn++;
        updateCurrentPlayer();
    }
}


function updateCurrentPlayer() {
    document.getElementById('currentPlayer').textContent = `Turno del jugador: ${((turn - 1) % 4) + 1}`;
}


document.getElementById('rollDice').addEventListener('click', rollDice);


players.forEach(player => {
    const startCell = document.getElementById('cell-1');
    startCell.appendChild(player.element);
});


function endGame() {
    alert('¡El juego ha terminado!');

}
