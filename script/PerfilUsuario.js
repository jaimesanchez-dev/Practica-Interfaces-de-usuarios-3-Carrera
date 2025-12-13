// PerfilUsuario.js

import {cargarUsuarioPerfil, inicializarCerrarSesion} from "./usuario.mjs";

import { inicializarToggles, cargarEstadoToggles} from "./ajustes.mjs";

document.addEventListener("DOMContentLoaded", () => {
    cargarUsuarioPerfil();
    inicializarToggles();
    cargarEstadoToggles();
    inicializarCerrarSesion();
});
