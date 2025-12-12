// Favoritos.js
import { aplicarIdioma, cargar_idioma } from './idioma.mjs';
import { cargarFavoritos, eliminarFavorito } from './destinos.mjs';

document.addEventListener('DOMContentLoaded', async () => {

    cargar_idioma();

    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma);
        });
    }

    // Cargamos los favoritos
    await cargarFavoritos();
    // eliminarFavorito() se llama dentro de cargarFavoritos() para reasignar eventos
});
