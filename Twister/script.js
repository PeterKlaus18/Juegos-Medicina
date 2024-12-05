
function colocarIconos() {
    
    const manos = `<i class="fas fa-hand-paper"></i>`; 
    const pies = `<div class="pie"></div>`;  

    
    const celdas = [
        "cell-1", "cell-2", "cell-3", "cell-4", "cell-5", "cell-6", 
        "cell-7", "cell-8", "cell-9", "cell-10", "cell-11", "cell-12", 
        "cell-13", "cell-14", "cell-15", "cell-16", "cell-17", "cell-18", 
        "cell-19", "cell-20", "cell-21", "cell-22", "cell-23", "cell-24"
    ];

    
    const celdasOcupadas = [];

    
    function obtenerCeldaAleatoria() {
        let celdaAleatoria;
        do {
            const index = Math.floor(Math.random() * celdas.length);
            celdaAleatoria = celdas[index];
        } while (celdasOcupadas.includes(celdaAleatoria)); 
        return celdaAleatoria;
    }

    
    let manosColocadas = 0;
    let piesColocados = 0;


    while (manosColocadas < 2) {
        let celda = obtenerCeldaAleatoria();
        let elemento = document.getElementById(celda);
        if (!elemento.innerHTML) {  
            elemento.innerHTML = manos;  
            celdasOcupadas.push(celda);  
            manosColocadas++;
        }
    }

    
    while (piesColocados < 2) {
        let celda = obtenerCeldaAleatoria();
        let elemento = document.getElementById(celda);
        if (!elemento.innerHTML) { 
            elemento.innerHTML = pies;  
            celdasOcupadas.push(celda);  
            piesColocados++;
        }
    }

    
    document.querySelector("button").disabled = true;
    document.querySelector("button").innerText = "Ya están colocados";
}
