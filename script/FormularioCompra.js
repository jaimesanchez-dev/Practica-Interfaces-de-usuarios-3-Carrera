// FormularioCompra.js

import { mostrarSeccionesFormulario, inicializarAcompañantes, realizarCompra, cargarTransportes } from "./formulario.mjs";
import { cargar_idioma, aplicarIdioma } from "./idioma.mjs";

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

    // Gestión del idioma
    cargar_idioma();

    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma);
        });
    }
});
