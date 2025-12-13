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
});