// buscador.mjs

import { getCiudades, renderizarDestinos } from "./galeria.mjs";

// Variables globales para reutilizarlas en los filtros
let buscadorInput;
let selectContinente;
let checkboxes;

// Inicializa el buscador y los filtros
export function iniciarBuscador() {
    buscadorInput = document.getElementById("buscadorInput");
    selectContinente = document.getElementById("filtroContinente");
    checkboxes = document.querySelectorAll(".filtro-check");

    // Escuchamos cambios en el input de texto
    buscadorInput.addEventListener("input", aplicarFiltros);

    // Escuchamos cambios en el selector de continente
    selectContinente.addEventListener("change", aplicarFiltros);

    // Escuchamos cambios en los checkboxes de transporte
    checkboxes.forEach(chk =>
        chk.addEventListener("change", aplicarFiltros)
    );
}

// Aplica todos los filtros activos y actualiza la galería
export function aplicarFiltros() {
    const ciudades = getCiudades();

    // Texto introducido por el usuario y continente seleccionado
    const texto = buscadorInput.value.toLowerCase();
    const continente = selectContinente.value;

    // Transportes marcados en los checkboxes
    const transportesMarcados = Array.from(checkboxes)
    .filter(c => c.checked)
    .map(c => c.value);

    // Filtramos
    const filtradas = ciudades.filter(ciudad => {
        
        // Filtro por texto (ciudad o país)
        const textoOK =
        ciudad.name.toLowerCase().includes(texto) ||
        ciudad.pais.toLowerCase().includes(texto);

        // Filtro por continente
        const continenteOK =
            continente === "todos" || ciudad.continente === continente;

        // Filtro por transporte
        const transporteOK =
            transportesMarcados.length === 0 ||
            transportesMarcados.some(t => ciudad.transportes.includes(t));

    return textoOK && continenteOK && transporteOK;
    });

    // Renderizamos solo los destinos filtrados
    renderizarDestinos(filtradas);
}
