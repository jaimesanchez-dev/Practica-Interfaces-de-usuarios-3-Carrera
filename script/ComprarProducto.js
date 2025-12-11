// ComprarProducto.js

import { boton_lista_favoritos  } from './botones_interactivos.mjs';
import { rellenar_info_destino, encontrarCiudad, cargarReseñasCiudad} from './destinos.mjs';

document.addEventListener("DOMContentLoaded", async () => {

    // Obtenemos el destino guardado en la pagina de GaleriaDestinos
    const nombre_ciudad = localStorage.getItem("destinoSeleccionado");
    if (!nombre_ciudad) return;

    const datos_ciudad = await encontrarCiudad(nombre_ciudad);
    rellenar_info_destino(datos_ciudad);
    boton_lista_favoritos();
    
    // Cargamos las reseñas del destino
    cargarReseñasCiudad(nombre_ciudad);


    const user = localStorage.getItem("currentUser");
    // Al hacer click en el boton de comprar, redirigimos a la pagina del formulario de compra (solo en el caso de que el usuario haya iniciado sesion)
    const botonComprar = document.querySelector(".producto-comprar-boton");
    if (botonComprar) {
        botonComprar.addEventListener("click", () => {
            if (!user) {
                e.preventDefault();
                alert("Debes iniciar sesión para comprar este destino.");
            } else {
                window.location.href = "FormularioCompra.html";
            }
        });
    }
    // Si el usuario no ha iniciado sesion, no puede añadir a favoritos el destino
    const botonesFavoritos = document.querySelectorAll(".btn-corazon");
    botonesFavoritos.forEach(boton => {
        boton.addEventListener("click", (e) => {
            if (!user) {
                e.preventDefault();
                alert("Debes iniciar sesión para añadir a favoritos.");
            }
            
        });
    });
});
