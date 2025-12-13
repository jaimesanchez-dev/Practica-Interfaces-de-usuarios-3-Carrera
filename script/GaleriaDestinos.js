// GaleriaDestinos.js

import { iniciarGaleria } from "./galeria.mjs";
import { iniciarBuscador, aplicarFiltros } from "./buscador.mjs";
import { cargar_idioma, aplicarIdioma } from "./idioma.mjs";

document.addEventListener("DOMContentLoaded", async () => {
    cargar_idioma();

    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", () => {
        const idioma = selector.value;
        localStorage.setItem("idioma", idioma);
        aplicarIdioma(idioma);
        aplicarFiltros();
        });
    }

    await iniciarGaleria();
    iniciarBuscador();
});