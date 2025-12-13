// MisReseñas.js

import { renderizarMisReseñas } from './reseñas.mjs';
import { cargar_idioma, aplicarIdioma } from './idioma.mjs';

document.addEventListener("DOMContentLoaded", async () => {

    const selector = document.querySelector(".header-idioma");
    const contenedor = document.getElementById("reseñaContenedor");
    const plantilla = document.getElementById("plantillaReseña");
    const currentUser = localStorage.getItem("currentUser");

    if (selector) {
        selector.addEventListener("change", async () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma);

            await renderizarMisReseñas({
                contenedor,
                plantilla,
                currentUser
            });
        });
    }

    await renderizarMisReseñas({
        contenedor,
        plantilla,
        currentUser
    });

    cargar_idioma();
});
