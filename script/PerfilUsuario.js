// PerfilUsuario.js

import {cargarUsuarioPerfil, inicializarCerrarSesion} from "./usuario.mjs";
import { cargar_idioma, aplicarIdioma } from "./idioma.mjs";
import { inicializarToggles, cargarEstadoToggles} from "./ajustes.mjs";

document.addEventListener("DOMContentLoaded", () => {
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

    cargarUsuarioPerfil();
    inicializarToggles();
    cargarEstadoToggles();
    inicializarCerrarSesion();
});
