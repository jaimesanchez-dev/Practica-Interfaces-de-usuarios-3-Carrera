// destinos.mjs
export function rellenar_info_destino() {
    const destino = JSON.parse(localStorage.getItem("destinoSeleccionado"));
    const datos = JSON.parse(localStorage.getItem("ciudadesJSON")); // tu JSON completo
    
    if (!destino || !datos) return;

    const { ciudad, pais, continente } = destino;
    let ciudadEncontrada;

    for (const cont of datos.continents) {
        if (cont.name === continente){
            for (const country of cont.countries) {
                if (country.name === pais) {
                ciudadEncontrada = country.cities.find(c => c.name === ciudad);
                break;
                }
            }
        }
    if (ciudadEncontrada) break;
    }

    if (ciudadEncontrada) {
    document.querySelector(".producto-nombre").textContent = `${ciudad} , ${pais}`;
    document.querySelector(".producto-precio").textContent = `${ciudadEncontrada.precio} €`;
    document.querySelector(".producto-descripcion").textContent = ciudadEncontrada.description;
    document.querySelector(".producto-imagen").src = ciudadEncontrada.image.url;
    document.querySelector(".producto-imagen").alt = ciudadEncontrada.image.alt;
    
    const listaTransportes = ciudadEncontrada.transportes || [];

    document.querySelectorAll(".caracteristica").forEach(checkbox => {
            checkbox.checked = listaTransportes.includes(checkbox.value);
        });

    }
}