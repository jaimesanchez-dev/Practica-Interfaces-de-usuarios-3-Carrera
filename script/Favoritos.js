// Favoritos.js
import { aplicarIdioma, cargar_idioma } from './idioma.mjs';
import { cargarFavoritos } from './destinos.mjs';

document.addEventListener('DOMContentLoaded', async () => {

    cargar_idioma();

    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", async () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma);
            // Recargar favoritos cuando cambie el idioma para actualizar las descripciones
            await cargarFavoritos();
        });
    }

    // Verificar si hay un usuario logueado
    const usuario = localStorage.getItem("currentUser");
    if (!usuario) {
        // Si no hay usuario, mostrar mensaje y no cargar favoritos
        const listaContainer = document.getElementById("lista-favoritos");
        const mensajeVacio = document.getElementById("mensaje-vacio");
        
        listaContainer.innerHTML = "";
        if (mensajeVacio) {
            mensajeVacio.textContent = "Debes iniciar sesión para ver tus favoritos.";
            mensajeVacio.style.display = "block";
            listaContainer.appendChild(mensajeVacio);
        }
        return;
    }

    // Cargamos los favoritos del usuario actual
    await cargarFavoritos();
});