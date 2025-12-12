import { iniciarCarrusel } from './carrusel.mjs';
import { aplicarIdioma, cargar_idioma } from './idioma.mjs';
import { boton_favoritos_home } from './botones_interactivos.mjs';

document.addEventListener('DOMContentLoaded', () => {
    boton_favoritos_home();

    iniciarCarrusel();

    // Controlamos a que páginas puede acceder el usuario si no ha iniciado sesión
    const user = localStorage.getItem("currentUser");
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
    const botonesCorazones = document.querySelectorAll(".boton-corazon");
    botonesCorazones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if (!user) {
                e.preventDefault();
                alert("Debes iniciar sesión para añadir a favoritos.");
            }
        });
    });

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


    for (let i = 1; i <= 8; i++) {
        const boton = document.getElementById(`b${i}`);
        // Si por algun motivo no existe el boton, saltamos a la siguiente iteracion
        if (!boton) continue;

        boton.addEventListener("click", () => {
            // Cogemos el nombre de la ciudad del h3 dentro del botón, que es el primer texto antes de la coma
            // y eliminamos posibles espacios en blanco alrededor con trim()
            const nombre_ciudad = boton.querySelector("h3").textContent.split(",")[0].trim();

            localStorage.setItem("destinoSeleccionado", nombre_ciudad);
            window.location.href = "ComprarProducto.html";
        });
    }

    for (let i = 1; i <= 6; i++) {
        const boton = document.querySelector(`.c${i}`);
        // Si por algun motivo no existe el boton, saltamos a la siguiente iteracion
        if (!boton) continue;

        boton.addEventListener("click", () => {
            // Accedemos al padre del botón (tarjeta-experiencia) y luego al h5 que contiene el nombre de la ciudad
            const tarjeta = boton.closest(".tarjeta-experiencia");
            const nombre_ciudad = tarjeta.querySelector(".tarjeta-experiencia-abajo")
                .textContent.split(",")[0].trim();

            localStorage.setItem("destinoSeleccionado", nombre_ciudad);
            window.location.href = "ComprarProducto.html";
        });
    }


});