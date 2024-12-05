// Definimos el único producto con un nombre y un precio inicial
let producto = {
    nombre: 'Producto Único',
    precio: 100000
};

// Función para crear el producto en el DOM
function crearProducto() {
    // Crear el contenedor del producto
    const productoDiv = document.createElement('div');
    productoDiv.id = 'product';

    // Crear el contenido del producto
    productoDiv.innerHTML = `
        <div class="product-info">
            <label for="product-name">Producto:</label>
            <input type="text" id="product-name" value="${producto.nombre}" oninput="actualizarNombreProducto(event)" />
            
            <label for="initial-price">Precio inicial (COP):</label>
            <input type="number" id="initial-price" value="${producto.precio}" oninput="actualizarPrecioInicial(event)" />
        </div>
        <div class="current-price">
            <h3>Precio actual: <span id="current-price">${producto.precio}</span> COP</h3>
        </div>
        <div class="buttons">
            <button onclick="increasePrice(1000)">+ 1,000 COP</button>
            <button onclick="increasePrice(5000)">+ 5,000 COP</button>
            <button onclick="increasePrice(10000)">+ 10,000 COP</button>
            <button onclick="increasePrice(20000)">+ 20,000 COP</button>
            <button onclick="increasePrice(50000)">+ 50,000 COP</button>
            <button onclick="increasePrice(100000)">+ 100,000 COP</button>
        </div>
    `;

    // Agregar el producto al contenedor de productos
    document.getElementById('product-container').appendChild(productoDiv);
}

// Función para incrementar el precio
function increasePrice(amount) {
    const currentPriceElement = document.getElementById('current-price');
    let currentPrice = parseInt(currentPriceElement.innerText.replace(/[^0-9]/g, ''), 10); // Obtener precio actual
    currentPrice += amount; // Incrementar el precio
    currentPriceElement.innerText = currentPrice.toLocaleString() + " COP"; // Actualizar el precio mostrado
}

// Función para actualizar el nombre del producto
function actualizarNombreProducto(event) {
    producto.nombre = event.target.value; // Actualizar el nombre del producto
}

// Función para actualizar el precio inicial
function actualizarPrecioInicial(event) {
    const nuevoPrecio = parseInt(event.target.value); // Obtener el nuevo precio
    if (!isNaN(nuevoPrecio) && nuevoPrecio >= 0) {
        producto.precio = nuevoPrecio; // Actualizar el precio inicial
        document.getElementById('current-price').innerText = producto.precio.toLocaleString() + " COP"; // Actualizar el precio actual
    }
}

// Crear el producto cuando cargue la página
crearProducto();
