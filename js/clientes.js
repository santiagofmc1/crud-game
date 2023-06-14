// Variables Globales
let clientes = [];
let editando = false;
let LS = window.localStorage;

// ---------------------------------------------------------
// Cargar registros del Local Storage
if (LS.getItem('clientes')) {
    clientes = JSON.parse(LS.getItem('clientes'));
}

imprimirTabla(clientes);


// ---------------------------------------------------------
// Cargar el formulario principal
const form = document.querySelector('#form-anadir');
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevenir que se recargue la página enviando el form

    anadirCliente();
});

const inputBuscar = document.querySelector('#buscar');
inputBuscar.addEventListener('keyup', buscarClientes);


// ---------------------------------------------------------
// Función para validar campo de correo
function validarCampos() {
    var email = document.getElementById("email").value;
  
    // Validación del correo: Debe contener el símbolo @
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Por favor, ingrese un correo válido.");
      return false;
    }
    return true;
  }


// ---------------------------------------------------------
// Funcion - Añadir cliente
function anadirCliente() {
    if (!validarCampos()){
        return;
    }
        const identificacion = document.querySelector('#identificacion').value;
        const nombres = document.querySelector('#nombres').value;
        const apellidos = document.querySelector('#apellidos').value;
        const telefono = document.querySelector('#telefono').value;
        const email = document.querySelector('#email').value;
        const fechaNacimiento = document.querySelector('#fechaNacimiento').value
        const nacionalidad = document.querySelector('#nacionalidad').value


        // Agregar al array
        const nuevoCliente = {
            id: editando === false ? Date.now() : editando,
            identificacion,
            nombres,
            apellidos,
            telefono,
            email,
            fechaNacimiento,
            nacionalidad,
            puntos: 0
        }

        if (editando) {
            nuevoCliente.id = editando
            clientes = clientes.map(cliente => cliente.id === editando ? nuevoCliente : cliente)

            // Cambiar titulos
            document.querySelector('#form-title').textContent = 'Añadir Clientes'
            document.querySelector('#form-button').textContent = 'Añadir';

            editando = false;
        } else {
            clientes.push(nuevoCliente);
        }

        editando = false;

        // Guardar en LocalStorage y borra registro
        LS.setItem('clientes', JSON.stringify(clientes));
        form.reset();
        imprimirTabla(clientes);
}


// ---------------------------------------------------------
// Funcion - Eliminar cliente
function eliminarCliente(id) {
    clientes = clientes.filter(cliente => cliente.id !== id);

    LS.setItem('clientes', JSON.stringify(clientes));
    imprimirTabla(clientes);
}


// ---------------------------------------------------------
// Funcion Cargar Datos
function cargarDatos(id) {
    // Cambiar titulos form
    document.querySelector('#form-title').textContent = 'Editar'
    document.querySelector('#form-button').textContent = 'Guardar Cambios';

    clientes.forEach(cliente => {
        if (cliente.id === id) {
            identificacion.value = cliente.identificacion
            nombres.value = cliente.nombres;
            apellidos.value = cliente.apellidos;
            telefono.value = cliente.telefono;
            email.value = cliente.email;
            fechaNacimiento.value = cliente.fechaNacimiento;
            nacionalidad.value = cliente.nacionalidad;
        }
    });

    editando = id;
}


// ---------------------------------------------------------
// Funcion Buscar Cliente
function buscarClientes() {
    // Verificar que no esté vacío
    if (inputBuscar.value === '') {
        imprimirTabla(clientes);
    } else {
        if (isNaN(inputBuscar.value)) { // Estudiar!!!
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


// ---------------------------------------------------------
// Funcion Imprimir
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
        <td>${cliente.telefono}</td>
        <td>${cliente.email}</td>
        <td>${cliente.fechaNacimiento}</td>
        <td>${cliente.nacionalidad}</td>
        <td>
            <div class="d-flex justify-content-center align-items-center">
                <button class="btn btn-primary me-1" onclick="cargarDatos(${cliente.id})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarCliente(${cliente.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </td>
        </tr>
    `
    });
}