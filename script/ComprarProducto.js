// ComprarProducto.js

import { boton_estrellas, boton_lista_favoritos  } from './botones_interactivos.mjs';
import { rellenar_info_destino, encontrarCiudad } from './destinos.mjs';

document.addEventListener("DOMContentLoaded", async () => {

    // Obtenemos el destino guardado en la pagina de GaleriaDestinos
    const nombre_ciudad = localStorage.getItem("destinoSeleccionado");
    if (!nombre_ciudad) return;

    const datos_ciudad = await encontrarCiudad(nombre_ciudad);
    rellenar_info_destino(datos_ciudad);
    boton_estrellas();
    boton_lista_favoritos();

    // Al hacer click en el boton de comprar, redirigimos a la pagina del formulario de compra
    const botonComprar = document.querySelector(".producto-comprar-boton");
    if (botonComprar) {
        botonComprar.addEventListener("click", () => {
            window.location.href = "FormularioCompra.html";
        });
    }
});
