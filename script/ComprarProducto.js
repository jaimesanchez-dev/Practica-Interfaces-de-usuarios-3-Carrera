// ComprarProducto.js

import { boton_lista_favoritos } from './botones_interactivos.mjs';
import { rellenar_info_destino, encontrarCiudad, cargarReseñasCiudad } from './destinos.mjs';
import { cargar_idioma, aplicarIdioma } from './idioma.mjs';

document.addEventListener("DOMContentLoaded", async () => {

    cargar_idioma();
    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", async () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma);
            await cargarDatosProducto();
        });
    }

    // Obtenemos el destino guardado en la pagina de GaleriaDestinos
    const nombre_ciudad = localStorage.getItem("destinoSeleccionado");
    if (!nombre_ciudad) return;

    async function cargarDatosProducto() {
        const datos_ciudad = await encontrarCiudad(nombre_ciudad);
        rellenar_info_destino(datos_ciudad);
    }
    await cargarDatosProducto();

    boton_lista_favoritos();

    // Cargamos las reseñas del destino
    cargarReseñasCiudad(nombre_ciudad);


    const user = localStorage.getItem("currentUser");
    // Al hacer click en el boton de comprar, redirigimos a la pagina del formulario de compra (solo en el caso de que el usuario haya iniciado sesion)
    const botonComprar = document.querySelector(".producto-comprar-boton");
    if (botonComprar) {
        botonComprar.addEventListener("click", (e) => {
            if (!user) {
                e.preventDefault();
                alert("Debes iniciar sesión para comprar este destino.");
            } else {
                window.location.href = "FormularioCompra.html";
            }
        });
    }
    // Si el usuario no ha iniciado sesion, no puede añadir a favoritos el destino
    const botonesFavoritos = document.querySelectorAll(".btn-corazon");
    botonesFavoritos.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if (!user) {
                e.preventDefault();
                alert("Debes iniciar sesión para añadir a favoritos.");
            }

        });
    });

    // Controlamos a que páginas puede acceder el usuario si no ha iniciado sesión
    const consejosLink = document.getElementById("link-consejos");
    const perfilLink = document.getElementById("link-perfil");
    const contactoLink = document.getElementById("link-contacto");
    consejosLink.addEventListener("click", (e) => {
        if (!user) {
            e.preventDefault();
            alert("Debes iniciar sesión para acceder a la página de consejos.");
        }
    });
    perfilLink.addEventListener("click", (e) => {
        if (!user) {
            e.preventDefault();
            alert("Debes iniciar sesión para acceder a la página del perfil.");
        }
    });
    contactoLink.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Esta opción no está implementada");
    });
});
