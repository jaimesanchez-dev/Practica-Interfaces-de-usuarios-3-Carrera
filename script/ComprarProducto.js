// ComprarProducto.js

import { boton_lista_favoritos } from './botonesInteractivos.mjs';
import { rellenar_info_destino, encontrarCiudad, cargarReseñasCiudad } from './destinos.mjs';
import { cargar_idioma, aplicarIdioma } from './idioma.mjs';
import { cargar_moneda } from './moneda.mjs';

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
    if (!nombre_ciudad) {
        console.error("No se ha seleccionado ningún destino");
        return;
    }

    async function cargarDatosProducto() {
        const datos_ciudad = await encontrarCiudad(nombre_ciudad);
        if (datos_ciudad) {
            rellenar_info_destino(datos_ciudad);
        }
    }
    await cargarDatosProducto();

    // Inicializar el botón de favoritos (esto carga el estado inicial del corazón)
    boton_lista_favoritos();

    // Cargamos las reseñas del destino
    cargarReseñasCiudad(nombre_ciudad);

    const user = localStorage.getItem("currentUser");
    
    // Al hacer click en el boton de comprar, redirigimos a la pagina del formulario de compra
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
    
    if (consejosLink) {
        consejosLink.addEventListener("click", (e) => {
            if (!user) {
                e.preventDefault();
                alert("Debes iniciar sesión para acceder a la página de consejos.");
            }
        });
    }
    
    if (perfilLink) {
        perfilLink.addEventListener("click", (e) => {
            if (!user) {
                e.preventDefault();
                alert("Debes iniciar sesión para acceder a la página del perfil.");
            }
        });
    }
    
    if (contactoLink) {
        contactoLink.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Esta opción no está implementada");
        });
    }

    // Cargamos la moneda
    cargar_moneda()
    const selectMoneda = document.querySelector(".header-moneda");
    if (selectMoneda) {
        selectMoneda.addEventListener("change", async () => {
            await cargarDatosProducto();
        });
    }

});