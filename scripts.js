// ✅ Clases del sistema
class Cliente {
    constructor(nombre, telefono, email) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
    }
}

class Reserva {
    constructor(cliente, fecha, hora, servicio) {
        this.cliente = cliente;
        this.fecha = fecha;
        this.hora = hora;
        this.servicio = servicio;
    }
}

class ProductoServicio {
    constructor(nombre, descripcion, precio) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

// ✅ Clase administradora principal
class Sistema {
    constructor() {
        this.clientes = [];
        this.reservas = [];
        this.productos = [];
    }

    // Métodos para clientes
    agregarCliente(nombre, telefono, email) {
        const nuevoCliente = new Cliente(nombre, telefono, email);
        this.clientes.push(nuevoCliente);
        this.mostrarClientes();
    }

    mostrarClientes() {
        const contenedor = document.querySelector('#listaClientes');
        contenedor.innerHTML = '';

        this.clientes.forEach((cliente, index) => {
            const div = document.createElement('div');
            div.classList.add('item-lista');
            div.innerHTML = `
                <strong>Nombre:</strong> ${cliente.nombre}<br>
                <strong>Teléfono:</strong> ${cliente.telefono}<br>
                <strong>Email:</strong> ${cliente.email}<br>
                <button onclick="sistema.eliminarCliente(${index})">Eliminar</button>
            `;
            contenedor.appendChild(div);
        });
    }

    eliminarCliente(indice) {
        if (confirm('¿Eliminar cliente?')) {
            this.clientes.splice(indice, 1);
            this.mostrarClientes();
        }
    }

    // Métodos para reservas
    agregarReserva(cliente, fecha, hora, servicio) {
        const nuevaReserva = new Reserva(cliente, fecha, hora, servicio);
        this.reservas.push(nuevaReserva);
        this.mostrarReservas();
    }

    mostrarReservas() {
        const contenedor = document.querySelector('#listaReservas');
        contenedor.innerHTML = '';

        this.reservas.forEach((reserva, index) => {
            const div = document.createElement('div');
            div.classList.add('item-lista');
            div.innerHTML = `
                <strong>Cliente:</strong> ${reserva.cliente}<br>
                <strong>Fecha:</strong> ${reserva.fecha}<br>
                <strong>Hora:</strong> ${reserva.hora}<br>
                <strong>Servicio:</strong> ${reserva.servicio}<br>
                <button onclick="sistema.eliminarReserva(${index})">Eliminar</button>
            `;
            contenedor.appendChild(div);
        });
    }

    eliminarReserva(indice) {
        if (confirm('¿Eliminar reserva?')) {
            this.reservas.splice(indice, 1);
            this.mostrarReservas();
        }
    }

    // Métodos para productos o servicios
    agregarProducto(nombre, descripcion, precio) {
        const nuevoProducto = new ProductoServicio(nombre, descripcion, precio);
        this.productos.push(nuevoProducto);
        this.mostrarProductos();
    }

    mostrarProductos() {
        const contenedor = document.querySelector('#listaProductos');
        contenedor.innerHTML = '';

        this.productos.forEach((producto, index) => {
            const div = document.createElement('div');
            div.classList.add('item-lista');
            div.innerHTML = `
                <strong>Nombre:</strong> ${producto.nombre}<br>
                <strong>Descripción:</strong> ${producto.descripcion}<br>
                <strong>Precio:</strong> $${producto.precio}<br>
            `;
            contenedor.appendChild(div);
        });
    }
}

// ✅ Crear instancia de Sistema
const sistema = new Sistema();

// ✅ Manejar formulario de Clientes
let formCliente = document.querySelector('#formCliente');
formCliente.addEventListener('submit', function(e) {
    e.preventDefault();
    let nombre = document.querySelector('#nombreCliente').value;
    let telefono = document.querySelector('#telefonoCliente').value;
    let email = document.querySelector('#emailCliente').value;

    sistema.agregarCliente(nombre, telefono, email);
    formCliente.reset();
});

// ✅ Manejar formulario de Reservas
let formReserva = document.querySelector('#formReserva');
formReserva.addEventListener('submit', function(e) {
    e.preventDefault();
    let cliente = document.querySelector('#clienteReserva').value;
    let fecha = document.querySelector('#fechaReserva').value;
    let hora = document.querySelector('#horaReserva').value;
    let servicio = document.querySelector('#servicioReserva').value;

    sistema.agregarReserva(cliente, fecha, hora, servicio);
    formReserva.reset();
});

// ✅ Mostrar una sección específica y ocultar las demás
function mostrarSeccion(idSeccion) {
    let secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
        seccion.classList.remove('mostrar');
    });

    let seccionMostrar = document.querySelector(idSeccion);
    if (seccionMostrar) {
        seccionMostrar.style.display = 'block';
        setTimeout(() => {
            seccionMostrar.classList.add('mostrar');
        }, 10);
    }

    // Marcar enlace activo
    document.querySelectorAll('.navbar a').forEach(a => a.classList.remove('activo'));
    document.querySelectorAll('.navbar a').forEach(a => {
        if (a.getAttribute('href') === idSeccion) {
            a.classList.add('activo');
        }
    });
}

// ✅ Mostrar solo Inicio al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion('#inicio');
});

// ✅ Función para ocultar o mostrar la sidebar y cambiar el ícono
function toggleSidebar() {
    const sidebar = document.querySelector('#sidebar');
    const contenido = document.querySelector('.contenido');
    const boton = document.querySelector('#botonMenu');

    sidebar.classList.toggle('cerrada');

    if (sidebar.classList.contains('cerrada')) {
        boton.textContent = '☰'; // Cambiar a flecha cuando está cerrada
    } else {
        boton.textContent = '☰'; // Volver a hamburguesa cuando está abierta
    }
}

// ✅ Activamos el botón menú
document.querySelector('#botonMenu').addEventListener('click', toggleSidebar);


// 🔽 Función que se activa al hacer clic en un enlace del menú principal
function toggleSubmenu(event, link) {
    event.preventDefault(); // Evita que el enlace navegue o salte a otra sección

    const submenu = link.nextElementSibling; // Obtiene el <ul> submenu que está justo después del enlace clickeado

    // 🔒 Cierra todos los submenús visibles que no sean el actual
    document.querySelectorAll('.submenu').forEach(ul => {
        if (ul !== submenu) ul.style.display = 'none'; // Oculta todos los demás submenús
    });

    // 🔁 Alterna la visibilidad del submenú actual
    if (submenu.style.display === 'block') {
        // Si está abierto, lo cierra
        submenu.style.display = 'none';
    } else {
        // Si está cerrado, lo abre
        submenu.style.display = 'block';
    }
}


