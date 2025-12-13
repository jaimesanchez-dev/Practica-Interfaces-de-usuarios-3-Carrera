// FormularioCompra.js

import { mostrarSeccionesFormulario, inicializarAcompañantes, realizarCompra, cargarTransportes } from "./formulario.mjs";
import { cargar_idioma, aplicarIdioma } from "./idioma.mjs";
import { cargar_moneda } from './moneda.mjs';

document.addEventListener("DOMContentLoaded", () => {

    // Referenciamos el formulario y el boton de compra
    const form = document.getElementById("formCompra");
    const botonComprar = document.getElementById("btnComprar");

    // Evitamos el envío por defecto del formulario (para que no se recarge la página)
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    }

    // Al pulsar el botón comprar se ejecuta la función realizarCompra
    if (botonComprar) {
        botonComprar.addEventListener("click", realizarCompra);
    }

    // Mostramos u ocultamos secciones del formulario según las opciones seleccionadas
    mostrarSeccionesFormulario();
    // Inicializamos la lógica para añadir acompañantes
    inicializarAcompañantes();
    // Cargamos los transportes disponibles para el destino
    cargarTransportes();

    // Cargamos el idioma seleccionado
    cargar_idioma();

    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma);
        });
    }

    // Cargamos la moneda seleccionada
    cargar_moneda()
});
