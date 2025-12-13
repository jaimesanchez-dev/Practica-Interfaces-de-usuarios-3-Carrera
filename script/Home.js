// Home.js

import { iniciarCarrusel } from './carrusel.mjs';
import { aplicarIdioma, cargar_idioma } from './idioma.mjs';
import { boton_favoritos_home } from './botonesInteractivos.mjs';
import { cargar_moneda } from './moneda.mjs';

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar botones de favoritos PRIMERO
    boton_favoritos_home();

    iniciarCarrusel();

    // Controlamos a que páginas puede acceder el usuario si no ha iniciado sesión
    const user = localStorage.getItem("currentUser");
    const consejosLink = document.getElementById("link-consejos");
    const perfilLink = document.getElementById("link-perfil");
    
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
    
    // Verificar si el usuario debe poder agregar a favoritos
    const heartContainers = document.querySelectorAll(".heart-container");
    heartContainers.forEach(container => {
        const checkbox = container.querySelector(".checkbox");
        if (checkbox) {
            checkbox.addEventListener("click", (e) => {
                if (!user) {
                    e.preventDefault();
                    checkbox.checked = false;
                    alert("Debes iniciar sesión para añadir a favoritos.");
                }
            });
        }
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

    // Botones del carrusel (b1-b8)
    for (let i = 1; i <= 8; i++) {
        const boton = document.getElementById(`b${i}`);
        if (!boton) continue;

        boton.addEventListener("click", () => {
            const h3 = boton.querySelector("h3");
            const ciudadId = h3.id;

            localStorage.setItem("destinoSeleccionado", ciudadId);
            window.location.href = "ComprarProducto.html";
        });
    }

    // Botones de compra (c1-c6)
    for (let i = 1; i <= 6; i++) {
        const boton = document.querySelector(`.c${i}`);
        if (!boton) continue;

        boton.addEventListener("click", () => {
            const tarjeta = boton.closest(".tarjeta-experiencia");
            const h5 = tarjeta.querySelector(".tarjeta-experiencia-abajo");
            const ciudadId = h5.id;

            localStorage.setItem("destinoSeleccionado", ciudadId);
            window.location.href = "ComprarProducto.html";
        });
    }

    cargar_moneda()
});