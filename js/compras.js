// Variables Globales
const LS = window.localStorage;
let clientes = [];
let juegos = [];
let datoCliente = [];
let datoJuego = [];
let juegoSeleccionada;


// ---------------------------------------------------------
// Traer registros del Local Storage
if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}
if (LS.getItem('juegos')) {
    juegos = JSON.parse(LS.getItem('juegos'));
}

const modClientes = document.querySelector('#clientes');
const modJuegos = document.querySelector('#juegos');


// Clientes
imprimirTablaClientes(clientes);

const inputBuscar = document.querySelector('#buscar-clientes');
inputBuscar.addEventListener('keyup', buscarClientes);

const btnSelectCliente = document.querySelector('#select-cliente');
btnSelectCliente.addEventListener('click', () => {

    modClientes.classList.add('d-none');
    modJuegos.classList.remove('d-none');

    cargarClienteCompra();
});


// ---------------------------------------------------------
// Funcion buscar cliente
function buscarClientes() {
    if (inputBuscar.value === '') {btnComprarJuego
        imprimirTablaClientes(clientes);
    } else {
        if (isNaN(inputBuscar.value)) {
            busqueda = clientes.filter(function (cliente) {
                return (
                    cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
                    cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase())
                );
            });

            // Validar si es un usuario
            if (busqueda.length === 1) {
                btnSelectCliente.classList.remove('disabled');
            } else if (busqueda.length > 1 || busqueda.length < 1 && btnSelectCliente.classList.contains('disabled')) {
                btnSelectCliente.classList.add('disabled');
            }

            datoCliente = busqueda;

            imprimirTablaClientes(busqueda);
        } else {
            let busqueda = clientes.filter(function (cliente) {
                return cliente.identificacion.includes(inputBuscar.value);
            });

            if (busqueda.length === 1) {
                btnSelectCliente.classList.remove('disabled');
            } else if (busqueda.length > 1 || busqueda.length < 1 && !btnSelectCliente.classList.contains('disabled')) {
                btnSelectCliente.classList.add('disabled');
            }

            datoCliente = busqueda;

            imprimirTablaClientes(busqueda);
        }
    }
}


// ---------------------------------------------------------
// Funcion cargar cliente
function cargarClienteCompra() {
    const clienteDatos = document.querySelector('#clienteDatos');

    clienteDatos.innerHTML = `
        <p><b>Documento:</b> ${datoCliente[0].identificacion}</p>
        <p><b>Nombre:</b> ${datoCliente[0].nombres} ${datoCliente[0].apellidos}</p>
        <p><b>Teléfono:</b> ${datoCliente[0].telefono}</p>
        <p><b>Email:</b> ${datoCliente[0].email}</p>
        <p><b>Nacionalidad:</b> ${datoCliente[0].nacionalidad}</p>
    `
}


// ---------------------------------------------------------
// Juegos
imprimirTablaJuegos(juegos);

const inputBuscarR = document.querySelector('#buscar-juegos');
inputBuscarR.addEventListener('keyup', buscarJuegos);

const btnComprarJuego = document.querySelector('#comprarJuego');
btnComprarJuego.addEventListener('click', () => {
    cargarJuegoCompra();

    document.querySelector('#form-juegos').classList.add('d-none');

    clientes.forEach((cliente, idx) =>{
        if(cliente.id === datoCliente[0].id){
            clientes[idx].puntos += parseInt(datoJuego[0].puntos); 
        }
    });

    // Guardar en LocalStorage
    LS.setItem('clientes', JSON.stringify(clientes));
});


// ---------------------------------------------------------
// Funcion buscar juegos
function buscarJuegos() {
    // Verificar que no esté vacío
    if (inputBuscarR.value === '') {
        console.log('vacio');
        imprimirTablaJuegos(juegos);
    } else {
        if (inputBuscarR.value) {
            busqueda = juegos.filter(function (juego) {
                return juego.nombreJuego.toLowerCase().includes(inputBuscarR.value.toLowerCase());
            });

            // Validar si es un sólo usuario
            if (busqueda.length === 1) {
                btnComprarJuego.classList.remove('disabled');
            } else if (busqueda.length > 1 || busqueda.length < 1 && btnComprarJuego.classList.contains('disabled')) {
                btnComprarJuego.classList.add('disabled');
            }

            datoJuego = busqueda;

            imprimirTablaJuegos(busqueda);
        }
    }
}


// ---------------------------------------------------------
// Funcion cargar juego compra
function cargarJuegoCompra() {
    const juegoDatos = document.querySelector('#juegoDatos');

    juegoDatos.innerHTML = `
        <p><b>Valor Juego:</b> ${datoJuego[0].valorCompra}</p>
        <p><b>+IVA:</b> ${datoJuego[0].valorCompra * 0.16}</p>
        <p><b>+Impuesto Especial:</b> ${datoJuego[0].valorCompra * 0.04}</p>
        <p><b>Total:</b> ${datoJuego[0].valorCompra * 1.20}</p>
        <hr>
        <p><b>Puntos de Fidelización de Juego:</b> ${datoJuego[0].puntos}</p>
    `
}


// ---------------------------------------------------------
// Funcion imprimir Clientes
function imprimirTablaClientes(datos) {
    // Limpiar la tabla anterior
    const tabla = document.querySelector('#tabla-clientes');
    tabla.innerHTML = '';

    // Imprimir
    datos.forEach(cliente => {
        tabla.innerHTML += `
        <tr>
        <td>${cliente.identificacion}</td>
        <td>${cliente.nombres}</td>
        <td>${cliente.apellidos}</td>
        </tr>
    `
    });
}

function imprimirTablaJuegos(datos) {
    // Limpiar tabla anterior
    const tabla = document.querySelector('#tabla-juegos');
    tabla.innerHTML = '';

    // Imprimir
    datos.forEach(juego => {
        tabla.innerHTML += `
        <tr>
        <td>${juego.nombreJuego}</td>
        <td>${juego.tematica}</td>
        <td>${juego.valorLicencia}</td>
        <td>${juego.puntos}</td>
        </tr>
    `
    });
}

