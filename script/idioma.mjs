// idioma.mjs

export function aplicarIdioma(idioma, traducciones) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const clave = el.getAttribute("data-i18n");
        el.innerText = traducciones[idioma][clave];
    });
}
const selector = document.querySelector(".header-idioma");

// CARGA EL IDIOMA GUARDADO //
export function cargar_idioma(traducciones) {
    const idioma = localStorage.getItem("idioma") || "es";
    aplicarIdioma(idioma, traducciones);
    if (selector) selector.value = idioma; //Actualiza el selector de idioma en la página en la que esté
}
