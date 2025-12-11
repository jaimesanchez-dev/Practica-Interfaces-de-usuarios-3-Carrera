import { iniciarCarrusel } from './carrusel.mjs';
import { aplicarIdioma, cargar_idioma } from './idioma.mjs';
import { boton_favoritos_home } from './botones_interactivos.mjs';

document.addEventListener('DOMContentLoaded', () => {
    boton_favoritos_home();

    iniciarCarrusel();

    // Controlamos a que páginas puede acceder el usuario si no ha iniciado sesión
    const user = localStorage.getItem("currentUser");
    const consejosLink = document.getElementById("link-consejos");
    const perfilLink = document.getElementById("link-perfil");
    const contactoLink = document.getElementById("link-contacto");
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
    contactoLink.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Esta opción no está implementada");
    });
    const botonesCorazones = document.querySelectorAll(".boton-corazon");
    botonesCorazones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if (!user) {
                e.preventDefault();
                alert("Debes iniciar sesión para añadir a favoritos.");
            }
        });
    });

    // Gestión del idioma
    const traducciones = {
        es: {
            inicio: "Inicio",
            destinos: "Destinos",
            consejos: "Consejos",
            perfil: "Perfil",
            contacto: "Contacto",
            iniciosesion: "Inicio sesion",
            registro: "Registro",
            español: "Español",
            ingles: "Inglés",
            banner1: "¡Descubre los mejores viajes!",
            banner2: "Mochileros Sin Fronteras",
            viena: "Viena, Austria",
            brujas: "Brujas, Bélgica",
            copenhague: "Copenhague, Dinamarca",
            liubliana: "Liubliana, Eslovenia",
            barcelona: "Barcelona, España",
            sevilla: "Sevilla, España",
            tallin: "Tallin, Estonia",
            paris: "París, Francia",
            comprar: "Comprar",
            praga: "Praga, República Checa",
            lucerna: "Lucerna, Suiza",
            reikiavik: "Reikiavik, Islandia",
            china: "China, Asia",
            seul: "Seúl, Corea del Sur",
            jaipur: "Jaipur, India",
            politica: "Política de Privacidad",
            nosotros: "Sobre nosotros",
            ayuda: "Ayuda"
        },
        en: {
            inicio: "Home",
            destinos: "Destinations",
            consejos: "Tips",
            perfil: "Profile",
            contacto: "Contact",
            iniciosesion: "Log In",
            registro: "Sign Up",
            español: "Spanish",
            ingles: "English",
            banner1: "Discover the best trips!",
            banner2: "Backpackers Without Borders",
            viena: "Vienna, Austria",
            brujas: "Bruges, Belgium",
            copenhague: "Copenhagen, Denmark",
            liubliana: "Ljubljana, Slovenia",
            barcelona: "Barcelona, Spain",
            sevilla: "Seville, Spain",
            tallin: "Tallinn, Estonia",
            paris: "Paris, France",
            comprar: "Buy",
            praga: "Prague, Czech Republic",
            lucerna: "Lucerne, Switzerland",
            reikiavik: "Reykjavik, Iceland",
            china: "China, Asia",
            seul: "Seoul, South Korea",
            jaipur: "Jaipur, India",
            politica: "Privacy Policy",
            nosotros: "About Us",
            ayuda: "Help"
        }
    };
    cargar_idioma(traducciones);


    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma, traducciones);
        });
    }


    for (let i = 1; i <= 8; i++) {
        const boton = document.getElementById(`b${i}`);
        // Si por algun motivo no existe el boton, saltamos a la siguiente iteracion
        if (!boton) continue;

        boton.addEventListener("click", () => {
            // Cogemos el nombre de la ciudad del h3 dentro del botón, que es el primer texto antes de la coma
            // y eliminamos posibles espacios en blanco alrededor con trim()
            const nombre_ciudad = boton.querySelector("h3").textContent.split(",")[0].trim();

            localStorage.setItem("destinoSeleccionado", nombre_ciudad);
            window.location.href = "ComprarProducto.html";
        });
    }

    for (let i = 1; i <= 6; i++) {
        const boton = document.querySelector(`.c${i}`);
        // Si por algun motivo no existe el boton, saltamos a la siguiente iteracion
        if (!boton) continue;

        boton.addEventListener("click", () => {
            // Accedemos al padre del botón (tarjeta-experiencia) y luego al h5 que contiene el nombre de la ciudad
            const tarjeta = boton.closest(".tarjeta-experiencia");
            const nombre_ciudad = tarjeta.querySelector(".tarjeta-experiencia-abajo")
                .textContent.split(",")[0].trim();

            localStorage.setItem("destinoSeleccionado", nombre_ciudad);
            window.location.href = "ComprarProducto.html";
        });
    }


});