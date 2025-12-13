// PerfilUsuario.js

import {cargarUsuarioPerfil, inicializarCerrarSesion} from "./usuario.mjs";
import { cargar_idioma, aplicarIdioma } from "./idioma.mjs";
import { inicializarToggles, cargarEstadoToggles} from "./ajustes.mjs";
import { cargar_moneda } from './moneda.mjs';

document.addEventListener("DOMContentLoaded", () => {
    // Carga el idioma seleccionado
    cargar_idioma();

    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma);
        });
    }
    // Cargamos los datos del usuario en el perfil
    cargarUsuarioPerfil();
    // Inicializamos los toggles de ajustes
    inicializarToggles();
    // Cargamos el estado guardado de los toggles
    cargarEstadoToggles();
    // Inicializamos el cierre de sesión
    inicializarCerrarSesion();

    // Cargamos la moneda
    cargar_moneda()
});
