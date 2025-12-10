// Favoritos.js
import { aplicarIdioma, cargar_idioma } from './idioma.mjs';
import { cargarFavoritos, eliminarFavorito } from './destinos.mjs';

document.addEventListener('DOMContentLoaded', async () => {

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
            lista_deseados: "Lista de deseados:",
            sin_favoritos: "No tienes favoritos aún.",
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
            lista_deseados: "Wishlist:",
            sin_favoritos: "You don't have any favorites yet.",
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

    // Cargamos los favoritos
    cargarFavoritos();
    // Si se pulsa el boton del corazon, se elimina de los favoritos
    eliminarFavorito();
});
