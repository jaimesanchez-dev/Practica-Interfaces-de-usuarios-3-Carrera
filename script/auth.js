// auth.js

import { inicializarRegistro, inicializarLogin, actualizarHeader } from "./loginRegistro.mjs";

document.addEventListener("DOMContentLoaded", () => {

    // Controlamos el acceso a los enlaces que aún no están implementados (href="#")
    const enlacesNoImplementados = document.querySelectorAll('a[href="#"]');
    enlacesNoImplementados.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Esta opción no está implementada");
        });
    });

    
    // Inicializamos el registro de usuarios
    inicializarRegistro();

    // Inicializamos el login de usuarios
    inicializarLogin();

    // Actualizamos el header según si hay un usuario logueado o no
    actualizarHeader();

});
