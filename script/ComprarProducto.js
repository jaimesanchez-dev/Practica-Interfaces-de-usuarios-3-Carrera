// ComprarProducto.js

import { boton_estrellas, boton_lista_favoritos  } from './botones_interactivos.mjs';
import { rellenar_info_destino } from './info_destino.mjs';

document.addEventListener('DOMContentLoaded', () => {
    rellenar_info_destino();
    boton_estrellas();
    boton_lista_favoritos();

});

document.addEventListener("DOMContentLoaded", async () => {
    // Cargar el JSON
    const res = await fetch("viajes.json");
    const data = await res.json();

    // Elegir el viaje que quieres mostrar
    const destino = JSON.parse(localStorage.getItem("destinoSeleccionado"));
    let viaje;
    
    outer: for (const continente of data.continents) {
        for (const pais of continente.countries) {
            for (const ciudad of pais.cities) {
                if (ciudad.name === destino) {
                    viaje = ciudad;
                    break outer;
                }
            }
        }
    }

    if (!viaje) return;

    // Ahora rellenamos los checkboxes según transporte
    // Suponiendo que luego agregues un array tipo viaje.transportes = ["avion", "tren"];
    const listaTransportes = viaje.transportes || [];

    document.querySelectorAll(".caracteristica").forEach(checkbox => {
        if (listaTransportes.includes(checkbox.value)) {
            checkbox.checked = true;
        }
    });
});