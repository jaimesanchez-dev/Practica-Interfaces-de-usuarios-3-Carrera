// idioma.mjs

import { traducciones } from './traducciones.mjs';

export function aplicarIdioma(idioma) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const clave = el.getAttribute("data-i18n");
        if (traducciones[idioma] && traducciones[idioma][clave]) {
            el.innerText = traducciones[idioma][clave];
        }
    });
}
const selector = document.querySelector(".header-idioma");

// CARGA EL IDIOMA GUARDADO //
export function cargar_idioma() {
    const idioma = localStorage.getItem("idioma") || "es";
    aplicarIdioma(idioma);
    if (selector) selector.value = idioma; //Actualiza el selector de idioma en la página en la que esté
}
