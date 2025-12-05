// Home.js
import { iniciarCarrusel } from './carrusel.mjs';
import { aplicarIdioma, cargar_idioma } from './idioma.mjs';
import { mostrarPerfilUsuario } from './usuario.mjs';
import { boton_favoritos_home } from './botones_interactivos.mjs';

document.addEventListener('DOMContentLoaded', () => {
    boton_favoritos_home();
    const user = localStorage.getItem('currentUser');
    if (user) {
        mostrarPerfilUsuario(user);
    }

    iniciarCarrusel();
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

    const boton_inicio = document.querySelector(".boton-ini");
    boton_inicio.addEventListener("click", () => { window.location.href = "InicioSesion.html"; });

    const boton_registro = document.querySelector(".boton-reg");
    boton_registro.addEventListener("click", () => { window.location.href = "Registro.html"; });


    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma, traducciones);
        });
    }


    const carrusel1 = document.getElementById("b1");
    const carrusel2 = document.getElementById("b2");
    const carrusel3 = document.getElementById("b3");
    const carrusel4 = document.getElementById("b4");
    const carrusel5 = document.getElementById("b5");
    const carrusel6 = document.getElementById("b6");
    const carrusel7 = document.getElementById("b7");
    const carrusel8 = document.getElementById("b8");

    carrusel1.addEventListener("click", () => {
        localStorage.setItem("carrusel", "1");
        window.location.href = "ComprarProducto.html";
    });
    carrusel2.addEventListener("click", () => {
        localStorage.setItem("carrusel", "2");
        window.location.href = "ComprarProducto.html";
    });
    carrusel3.addEventListener("click", () => {
        localStorage.setItem("carrusel", "3");
        window.location.href = "ComprarProducto.html";
    });
    carrusel4.addEventListener("click", () => {
        localStorage.setItem("carrusel", "4");
        window.location.href = "ComprarProducto.html";
    });
    carrusel5.addEventListener("click", () => {
        localStorage.setItem("carrusel", "5");
        window.location.href = "ComprarProducto.html";
    });
    carrusel6.addEventListener("click", () => {
        localStorage.setItem("carrusel", "6");
        window.location.href = "ComprarProducto.html";
    });
    carrusel7.addEventListener("click", () => {
        localStorage.setItem("carrusel", "7");
        window.location.href = "ComprarProducto.html";
    });
    carrusel8.addEventListener("click", () => {
        localStorage.setItem("carrusel", "8");
        window.location.href = "ComprarProducto.html";
    });


    const compra1 = document.getElementById("c1");
    const compra2 = document.getElementById("c2");
    const compra3 = document.getElementById("c3");
    const compra4 = document.getElementById("c4");
    const compra5 = document.getElementById("c5");
    const compra6 = document.getElementById("c6");

    compra1.addEventListener("click", () => {
        localStorage.setItem("experiencia", "1");
        window.location.href = "ComprarProducto.html";
    });
    compra2.addEventListener("click", () => {
        localStorage.setItem("experiencia", "2");
        window.location.href = "ComprarProducto.html";
    });
    compra3.addEventListener("click", () => {
        localStorage.setItem("experiencia", "3");
        window.location.href = "ComprarProducto.html";
    });
    compra4.addEventListener("click", () => {
        localStorage.setItem("experiencia", "4");
        window.location.href = "ComprarProducto.html";
    });
    compra5.addEventListener("click", () => {
        localStorage.setItem("experiencia", "5");
        window.location.href = "ComprarProducto.html";
    });
    compra6.addEventListener("click", () => {
        localStorage.setItem("experiencia", "6");
        window.location.href = "ComprarProducto.html";
    });


});