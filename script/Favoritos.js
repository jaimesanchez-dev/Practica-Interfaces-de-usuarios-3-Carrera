// Favoritos.js
import { aplicarIdioma, cargar_idioma } from './idioma.mjs';

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

    // 2. Cargar el json
    let countriesData = null;
    try {
        const storedJson = localStorage.getItem("ciudadesJSON");
        if (storedJson) {
            countriesData = JSON.parse(storedJson);
        } else {
            const res = await fetch("ciudades-del-mundo.json");
            countriesData = await res.json();
            localStorage.setItem("ciudadesJSON", JSON.stringify(countriesData));
        }
    } catch (e) {
        console.error("Error loading JSON:", e);
        return;
    }

    // 3. Cargar los favoritos
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const listaContainer = document.getElementById("lista-favoritos");
    const mensajeVacio = document.getElementById("mensaje-vacio");

    if (favoritos.length === 0) {
        mensajeVacio.style.display = "block";
    }

    // 4. Funcion para encontrar los detalles de la ciudad
    function encontrarCiudad(cityName) {
        if (!datospaises || !datospaises.continents) return null;
        for (const continente of datospaises.continents) {
            for (const pais of continente.paises) {
                for (const ciudad of pais.ciudades) {
                    if (cityName.includes(ciudad.name)) {
                        return { ...ciudad, pais: pais.name };
                    }
                }
            }
        }
        return null;
    }

    // 5. Renderizar los favoritos
    function renderFavorites() {
        listaContainer.innerHTML = "";
        if (favoritos.length === 0) {
            listaContainer.appendChild(mensajeVacio);
            mensajeVacio.style.display = "block";
            return;
        }

        favoritos.forEach(favItem => {
            const details = encontrarCiudad(favItem.nombre);
            const displayName = favItem.nombre;
            const description = details ? details.description : "Descripción no disponible.";

            const itemDiv = document.createElement("div");
            itemDiv.classList.add("favorito-item");

            itemDiv.innerHTML = `
                <button class="boton-corazon-fav" data-nombre="${favItem.nombre}">
                    <img src="images/corazon-negro-rojo.png" alt="Quitar de favoritos">
                </button>
                <div class="favorito-info">
                    <h2>${displayName}</h2>
                    <p>${description}</p>
                </div>
            `;

            listaContainer.appendChild(itemDiv);
        });

        // Re-attach listeners to removal buttons
        attachRemoveListeners();
    }

    function attachRemoveListeners() {
        const buttons = document.querySelectorAll(".boton-corazon-fav");
        buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const nombreToRemove = btn.dataset.nombre;
                // Remove from array
                favoritos = favoritos.filter(f => f.nombre !== nombreToRemove);
                // Update localStorage
                localStorage.setItem("favoritos", JSON.stringify(favoritos));
                // Re-render
                renderFavorites();
            });
        });
    }

    renderFavorites();

});
