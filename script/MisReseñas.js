// MisReseñas.js

import { renderizarMisReseñas } from './reseñas.mjs';
import { cargar_idioma, aplicarIdioma } from './idioma.mjs';
import { cargar_moneda } from './moneda.mjs';

document.addEventListener("DOMContentLoaded", async () => {
    
    // Referencias a elementos necesarios
    const selector = document.querySelector(".header-idioma");
    const contenedor = document.getElementById("reseñaContenedor");
    const plantilla = document.getElementById("plantillaReseña");
    const currentUser = localStorage.getItem("currentUser");

    // Cambio de idioma
    if (selector) {
        selector.addEventListener("change", async () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma);

            // Volvemos a renderizar las reseñas con el nuevo idioma
            await renderizarMisReseñas({
                contenedor,
                plantilla,
                currentUser
            });
        });
    }
    // Renderizamos las reseñas del usuario al cargar la página
    await renderizarMisReseñas({
        contenedor,
        plantilla,
        currentUser
    });

    // Cargamos el idioma
    cargar_idioma();

    // Cargamos la moneda
    cargar_moneda()
});
