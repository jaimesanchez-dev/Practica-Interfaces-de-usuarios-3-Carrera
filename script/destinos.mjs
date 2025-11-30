// destinos.mjs
export function rellenar_info_destino() {
    JSON.parse(localStorage.getItem("destinoSeleccionado"));
    const datos = JSON.parse(localStorage.getItem("ciudadesJSON")); // tu JSON completo
    const { ciudad, pais } = destino;

    let ciudadEncontrada;

    for (const continente of datos.continents) {
    for (const country of continente.countries) {
        if (country.name === pais) {
        ciudadEncontrada = country.cities.find(c => c.name === ciudad);
        break;
        }
    }
    if (ciudadEncontrada) break;
    }

    if (ciudadEncontrada) {
    document.querySelector(".producto-nombre").textContent = `${ciudad} - ${pais}`;
    document.querySelector(".producto-descripcion").textContent = ciudadEncontrada.description;
    document.querySelector(".producto-imagen").src = ciudadEncontrada.image.url;
    document.querySelector(".producto-imagen").alt = ciudadEncontrada.image.alt;

    // Aquí podrías rellenar los transportes si añadiste ese campo al JSON
    }
}