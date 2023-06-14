// Variables globales
let clientes = [];
let editando = false;
let LS = window.localStorage;


// -- Traer registros del Local Storage si existen
if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}

imprimirTabla(clientes);

const inputBuscar = document.querySelector('#buscar');
inputBuscar.addEventListener('keyup', buscarClientes);



// ----------------------------------------------------
// Funcion Buscar cliente
function buscarClientes() {
    // Verificar que no esta vacío
    if (inputBuscar.value === '') {
        imprimirTabla(clientes);
    } else {
        if (isNaN(inputBuscar.value)) {
            let busqueda = clientes.filter(function (cliente) {
                return (
                    cliente.apellidos.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
                    cliente.nombres.toLowerCase().includes(inputBuscar.value.toLowerCase())
                );
            });

            imprimirTabla(busqueda);
        } else {
            let busqueda = clientes.filter(function (cliente) {
                return cliente.identificacion.includes(inputBuscar.value);
            });

            imprimirTabla(busqueda);
        }
    }
}


function imprimirTabla(datos) {
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
        <td>${cliente.puntos}</td>
        </tr>
    `
    });
}