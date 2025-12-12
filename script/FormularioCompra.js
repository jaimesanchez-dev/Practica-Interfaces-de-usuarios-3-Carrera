import { mostrarSeccionesFormulario, inicializarAcompañantes, realizarCompra, cargarTransportes } from "./formulario.mjs";
document.addEventListener("DOMContentLoaded", () => {

    // Referenciamos todos los elementos necesarios
    const form = document.getElementById("formCompra");
    const botonComprar = document.getElementById("btnComprar");


    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    }

    if (botonComprar) {
        botonComprar.addEventListener("click", realizarCompra);
    }

    mostrarSeccionesFormulario();
    inicializarAcompañantes();
    cargarTransportes();
});




