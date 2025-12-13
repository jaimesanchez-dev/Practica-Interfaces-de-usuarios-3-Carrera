// idioma.mjs

import { traducciones } from './traducciones.mjs';

// Recorre todos los elementos con el atributo data-i18n y aplica la traducción
export function aplicarIdioma(idioma) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const clave = el.getAttribute("data-i18n");
        if (traducciones[idioma] && traducciones[idioma][clave]) {
            // si es un input, cambiar el placeholder, porque no tiene texto interno
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                if (el.type === "submit" || el.type === "reset" || el.type === "button") {
                    el.value = traducciones[idioma][clave];
                } else {
                    el.placeholder = traducciones[idioma][clave];
                }
            } else {
                el.innerText = traducciones[idioma][clave];
            }
        }
    });
}
// Selector del header para idioma
const selector = document.querySelector(".header-idioma");

// Obtiene el idioma guardado en localStorage y lo aplica
export function cargar_idioma() {
    const idioma = localStorage.getItem("idioma") || "es";
    aplicarIdioma(idioma);
    if (selector) selector.value = idioma; // actualiza el selector de idioma en la página en la que esté
}
