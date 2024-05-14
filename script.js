function guardarCarritoEnStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeStorage() {
  const carritoJSON = localStorage.getItem('carrito');
  carrito = JSON.parse(carritoJSON) || [];
}

function guardarProductosEnStorage(productos) {
  localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenerProductosDesdeStorage() {
  const productosJSON = localStorage.getItem('productos');
  return JSON.parse(productosJSON) || [];
}

const productos = [
  {
    id: 1,
    foto: "https://www.arrichetta.com.ar/wp-content/uploads/2021/07/auricular-hs-m300-negro_2072632_md-300x300.jpg",
    nombre: "Auriculares Sony",
    precio: 14999,
  },
  {
    id: 2,
    foto: "https://www.venex.com.ar/products_images/1608644492_22868cbc25d88f5daa013c0d4582e3f63858cc874d669e17d503f6fec2a0b71b.jpg",
    nombre: "Smart Watch Imilab",
    precio: 5900,
  },
  {
    id: 3,
    foto: "https://www.elkjop.no/image/dv_web_D180001002180018/10014/chromecast-3-generasjon.jpg?$prod$",
    nombre: "ChromeCast 3",
    precio: 26300,
  },
  {
    id: 4,
    foto: "https://www.adorama.com/images/300x300/logg603.jpg",
    nombre: "Mouse Logitech",
    precio: 1200,
  },
  {
    id: 5,
    foto: "https://d2r9epyceweg5n.cloudfront.net/stores/001/710/410/products/auriculares-dragon-war-freya-ghs00711-f9591d82e05edf148316231664771725-1024-1024.jpg",
    nombre: "Auriculares D. War",
    precio: 120000,
  },
  {
    id: 6,
    foto: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.TroSBzh4_ibrX1JM9PAEKwAAAA%26pid%3DApi&f=1",
    nombre: "Celular iPhone 12",
    precio: 240000,
  },
  {
    id: 7,
    foto: "https://images.fravega.com/f300/6cfb366a4fd646578f96b68fa74a7866.jpg.webp",
    nombre: "Monitor LG LED 32MN500M-B 32″ IPS FHD 75Hz 5ms",
    precio: 364315,
  },
  {
    id: 8,
    foto: "https://acdn.mitiendanube.com/stores/001/321/783/products/thinkpad_l15_gen_3_amd_ct1_03-905d72bef20687ad8617128650123255-640-0.jpg",
    nombre: "LENOVO THINKPAD L15 R5 16GB 256 W11P",
    precio: 1401534,
  },
  {
    id: 9,
    foto: "https://arrichetta.com.ar/wp-content/uploads/2024/03/91131387_0095591630.jpg",
    nombre: "Mochila Lenovo Esential Eco 16",
    precio: 86408,
  },
  {
    id: 10,
    foto: "https://arrichetta.com.ar/wp-content/uploads/2024/04/41faRyd7YhL.jpg",
    nombre: "memoria ram 32G KI 3600 DDR4 FURY BEAST BL",
    precio: 140770,
  },
  {
    id: 11,
    foto: "https://arrichetta.com.ar/wp-content/uploads/2024/04/20210310121851_185.jpg",
    nombre: "impresora 3D NEBULA G3",
    precio: 729309,
  },
  {
    id: 12,
    foto: "https://arrichetta.com.ar/wp-content/uploads/2024/04/S50GC_002_Front2_Black_SCOM.jpg",
    nombre: "MONitor SAM 34″ C500",
    precio: 784000,
  },
];

guardarProductosEnStorage(productos);

const productosAlmacenados = obtenerProductosDesdeStorage();

let carrito = [];

cargarCarritoDesdeStorage();

function cargarProductos() {
  const seccionProductos = document.getElementById('productos');
  seccionProductos.innerHTML = '';

  productosAlmacenados.forEach(producto => {
      const productoHTML = `
          <div class="producto">
              <img src="${producto.foto}" alt="${producto.nombre}">
              <h3>${producto.nombre}</h3>
              <p>Precio: $${producto.precio.toFixed(2)}</p>
              <label for="cantidad-${producto.id}">Cantidad:</label>
              <input type="number" id="cantidad-${producto.id}" min="1" value="1">
              <button onclick="agregarProducto(${producto.id})">Agregar al Carrito</button>
          </div>
      `;
      seccionProductos.innerHTML += productoHTML;
  });

  mostrarCarrito(); 
}

function agregarProducto(id) {
  const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
  const productoSeleccionado = productosAlmacenados.find(producto => producto.id === id);

  if (!productoSeleccionado) {
      console.error('Producto no encontrado');
      return;
  }

  const productoEnCarrito = carrito.find(item => item.producto.id === id);
  if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidad;
  } else {
      carrito.push({ producto: productoSeleccionado, cantidad });
  }

  Swal.fire({
    title: "producto agregado!",
    icon: "success"
  });
  guardarCarritoEnStorage();
  mostrarCarrito();
}

function mostrarCarrito() {
  const listaCarrito = document.getElementById('listaCarrito');
  listaCarrito.innerHTML = '';

  carrito.forEach(({ producto, cantidad }) => {
      const itemHTML = `
          <li>
              ${producto.nombre} - Cantidad: ${cantidad} - Precio: $${(producto.precio * cantidad).toFixed(2)}
              <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
              <input type="number" id="cantidad-${producto.id}" min="1" max="${cantidad}" value="${cantidad}" onchange="actualizarCantidad(${producto.id}, this.value)">
          </li>
      `;
      listaCarrito.innerHTML += itemHTML;
  });

  calcularTotal();
}

function eliminarProducto(id) {
  carrito = carrito.filter(item => item.producto.id !== id);
  Swal.fire({
    icon: "error",
    title: "producto eliminado",
  });
  guardarCarritoEnStorage();
  mostrarCarrito();
}

function actualizarCantidad(id, cantidad) {
  const index = carrito.findIndex(item => item.producto.id === id);
  if (index !== -1) {
    carrito[index].cantidad = parseInt(cantidad);
    guardarCarritoEnStorage();
    mostrarCarrito();
  }
}

function vaciarCarrito() {
  Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas vaciar el carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, vaciar carrito",
      cancelButtonText: "Cancelar"
  }).then((result) => {
      if (result.isConfirmed) {
          carrito = [];
          guardarCarritoEnStorage();
          mostrarCarrito();
          Swal.fire(
              "Carrito vaciado",
              "El carrito se ha vaciado exitosamente",
              "success"
          );
      }
  });
}


function calcularTotal() {
  const total = carrito.reduce((accumulator, item) => {
      return accumulator + item.producto.precio * item.cantidad;
  }, 0);

  const totalElement = document.getElementById('total');
  totalElement.textContent = `Total a pagar: $${total.toFixed(2)}`;
}

function finalizarCompra() {
  Swal.fire({
      title: "Compra finalizada",
      text: "¡Gracias por su compra!",
      icon: "success",
      confirmButtonText: "Aceptar"
  }).then(() => {
      carrito = [];
      guardarCarritoEnStorage();
      mostrarCarrito();
  });
}



cargarProductos();
