// Variables
let juegos = [];
let editando = false;
let LS = window.localStorage;

// ---------------------------------------------------------
// Traer juegos del Local Storage
if (LS.getItem('juegos')) {
    juegos = JSON.parse(LS.getItem('juegos'));
}

imprimirTabla(juegos);


// ---------------------------------------------------------
// Traer el form principal
const form = document.querySelector('#form-anadir');
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevenir que se recargue la página enviando el form

    anadirJuego();
});


// ---------------------------------------------------------
// Funcion añadir Juego
function anadirJuego() {
    const nombreJuego = document.querySelector('#nombreJuego').value;
    const tematica = document.querySelector('#tematica').value;
    const valorLicencia = document.querySelector('#valorLicencia').value;
    const puntos = document.querySelector('#puntos').value;


    // Agregar al array
    const nuevoJuego = {
        id: editando === false ? Date.now() : editando,
        nombreJuego,
        tematica,
        valorLicencia,
        puntos
    }

    if (editando) {
        nuevoJuego.id = editando
        juegos = juegos.map(juego => juego.id === editando ? nuevoJuego : juego)

        // Cambiar titulos
        document.querySelector('#form-title').textContent = 'Añadir juegos'
        document.querySelector('#form-button').textContent = 'Añadir';

        editando = false;
    } else {
        juegos.push(nuevoJuego);
    }

    editando = false;

    // Guardar en LocalStorage
    LS.setItem('juegos', JSON.stringify(juegos));
    form.reset();
    imprimirTabla(juegos);
}


// ---------------------------------------------------------
// Funcion Eliminar Juego
function eliminarJuego(id) {
    juegos = juegos.filter(juego => juego.id !== id);

    // Guardar en LocalStorage
    LS.setItem('juegos', JSON.stringify(juegos));

    imprimirTabla(juegos);
}


// ---------------------------------------------------------
// Funcion cargar datos
function cargarDatos(id) {
    // Cambiar titulos form
    document.querySelector('#form-title').textContent = 'Editar'
    document.querySelector('#form-button').textContent = 'Guardar Cambios';

    juegos.forEach(juego => {
        if (juego.id === id) {
            nombreJuego.value = juego.nombreJuego;
            tematica.value = juego.tematica;
            valorLicencia.value = juego.valorLicencia;
            puntos.value = juego.puntos;
        }
    });

    editando = id;

}


// ---------------------------------------------------------
// Funcion Imprimir tabla
function imprimirTabla(datos) {
    // Limpiar la tabla anterior
    const tabla = document.querySelector('#tabla-juegos');
    tabla.innerHTML = '';

    // Imprimir
    datos.forEach(juego => {
        tabla.innerHTML += `
        <tr>
        <td>${juego.id}</td>
        <td>${juego.nombreJuego}</td>
        <td>${juego.tematica}</td>
        <td>${juego.valorLicencia}</td>
        <td>${juego.puntos}</td>
        <td>
            <div class="d-flex justify-content-center align-items-center">
                <button class="btn btn-primary me-1" onclick="cargarDatos(${juego.id})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger" onclick="eliminarJuego(${juego.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </td>
        </tr>
    `
    });
}