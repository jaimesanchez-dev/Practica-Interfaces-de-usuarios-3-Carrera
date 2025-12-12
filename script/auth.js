// auth.js

import { inicializarRegistro, inicializarLogin, actualizarHeader } from "./loginRegistro.mjs";

document.addEventListener("DOMContentLoaded", () => {
    // Controlamos el acceso a los enlaces no implementados
    const enlacesNoImplementados = document.querySelectorAll('a[href="#"]');
    enlacesNoImplementados.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Esta opción no está implementada");
        });
    });

    inicializarRegistro();
    inicializarLogin();
    actualizarHeader();
});
