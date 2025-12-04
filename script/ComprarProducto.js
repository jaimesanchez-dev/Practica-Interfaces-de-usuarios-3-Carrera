// ComprarProducto.js

import { boton_estrellas, boton_lista_favoritos  } from './botones_interactivos.mjs';
import { rellenar_info_destino } from './destinos.mjs';

document.addEventListener("DOMContentLoaded", async () => {

    // Cargamos el JSON de ciudades
    const res = await fetch("../ciudades-del-mundo.json");
    const data = await res.json();

    // Obtenemos el destino guardado en la pagina de GaleriaDestinos
    const destino = JSON.parse(localStorage.getItem("destinoSeleccionado"));
    if (!destino) return;

    // Guardar JSON completo en el localStorage para usarlo en otras páginas y asi que no tenga que volver a cargarlo
    localStorage.setItem("ciudadesJSON", JSON.stringify(data));

    rellenar_info_destino();
    boton_estrellas();
    boton_lista_favoritos();
});
