const totalRows = 18;
        const cols = 3;
        const totalButtons = totalRows / 2 * cols;
        let removedButtons = 0;
        const colors = {
            "#FFD700": "amarillo",
            "#1E90FF": "azul",
            "#32CD32": "verde",
            "#FF69B4": "rosado",
            "#9370DB": "morado",
            "#000000": "negro"
        };
        const playerCoins = [0, 0, 0, 0];
        let currentPlayer = 1;

        const tower1 = document.getElementById("tower1");
        const tower2 = document.getElementById("tower2");
        const rollDiceButton = document.getElementById("rollDiceButton");
        const currentPlayerDisplay = document.getElementById("currentPlayer");
        const questionContainer = document.getElementById("questionContainer");
        const playerScores = [
            document.getElementById("player1Coins"),
            document.getElementById("player2Coins"),
            document.getElementById("player3Coins"),
            document.getElementById("player4Coins"),
        ];

        let preguntas;

        async function loadPreguntas() {
            const response = await fetch("preguntas.json");
            preguntas = await response.json();
        }

        function resetGame() {
            tower1.innerHTML = '';
            tower2.innerHTML = '';
            removedButtons = 0;
            playerCoins.fill(0);
            playerScores.forEach((score, index) => {
                score.textContent = playerCoins[index];
            });
            createTower("tower1", true);
            createTower("tower2", false);
        }

        function getRandomPregunta(color) {
            if (preguntas && preguntas[color]) {
                const preguntasColor = preguntas[color];
                const randomIndex = Math.floor(Math.random() * preguntasColor.length);
                return preguntasColor[randomIndex];
            }
            return "No hay preguntas disponibles para este color.";
        }

        rollDiceButton.addEventListener("click", () => {
            const randomColorHex = Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)];
            const randomColor = colors[randomColorHex];
            const coinsEarned = randomColor === "negro" ? 2 : 1;
            playerCoins[currentPlayer - 1] += coinsEarned;
            playerScores[currentPlayer - 1].textContent = playerCoins[currentPlayer - 1];

            const pregunta = getRandomPregunta(randomColor);
            questionContainer.innerHTML = `
                <p><strong>Pregunta (${randomColor.toUpperCase()}):</strong> ${pregunta}</p>
            `;
            currentPlayer = (currentPlayer % 4) + 1;
            setTimeout(() => {
                alert(`¡Es turno del Jugador ${currentPlayer}!`);
                currentPlayerDisplay.textContent = `Turno del Jugador ${currentPlayer}`;
            }, 100);
        });

        async function initGame() {
            await loadPreguntas();
            createTower("tower1", true); 
            createTower("tower2", false); 
        }

        initGame();

        function createTower(gridId, buttonsInEvenRows) {
            const tower = document.getElementById(gridId);
            for (let i = 0; i < totalRows; i++) {
                if ((i % 2 === 0 && buttonsInEvenRows) || (i % 2 === 1 && !buttonsInEvenRows)) {
                    
                    const rowState = { left: false, center: false, right: false };
                    for (let j = 0; j < cols; j++) {
                        const button = document.createElement("button");
                        button.style.backgroundColor = Object.keys(colors)[Math.floor(Math.random() * Object.keys(colors).length)];
                        button.addEventListener("click", () => {
                            if (j === 1 && (rowState.left || rowState.right)) {
                                alert("¡Juego terminado! La torre ha caido.");
                                endGame();
                            } else if ((j === 0 || j === 2) && rowState.center) {
                                alert("¡Juego terminado! La torre ha caido.");
                                endGame();
                            } else {
                                button.style.visibility = "hidden";
                                removedButtons++;
                                if (j === 0) rowState.left = true;
                                if (j === 1) rowState.center = true;
                                if (j === 2) rowState.right = true;

                                
                                const baseThreshold = 50; 
                                const endProbability = Math.max(0, (removedButtons / totalButtons) * 100 - baseThreshold);
                                if (Math.random() * 100 < endProbability) {
                                    alert(`¡Juego terminado! La torre ha caido.`);
                                    endGame();
                                }
                            }
                        });
                        tower.appendChild(button);
                    }
                } else {
                    
                    const solidRow = document.createElement("div");
                    solidRow.classList.add("solid-row");
                    tower.appendChild(solidRow);
                }
            }
        }

        function endGame() {
            const maxCoins = Math.max(...playerCoins);
            const winners = playerCoins
                .map((coins, index) => (coins === maxCoins ? `Jugador ${index + 1}` : null))
                .filter(Boolean);
            alert(`¡Juego terminado! Ganador${winners.length > 1 ? 'es' : ''}: ${winners.join(', ')} con ${maxCoins} monedas.`);
            resetGame();
        }