// buscador.mjs

import { getCiudades, renderizarDestinos } from "./galeria.mjs";

let buscadorInput;
let selectContinente;
let checkboxes;

export function iniciarBuscador() {
    buscadorInput = document.getElementById("buscadorInput");
    selectContinente = document.getElementById("filtroContinente");
    checkboxes = document.querySelectorAll(".filtro-check");

    buscadorInput.addEventListener("input", aplicarFiltros);
    selectContinente.addEventListener("change", aplicarFiltros);
    checkboxes.forEach(chk =>
        chk.addEventListener("change", aplicarFiltros)
    );
}

export function aplicarFiltros() {
    const ciudades = getCiudades();

    const texto = buscadorInput.value.toLowerCase();
    const continente = selectContinente.value;

    const transportesMarcados = Array.from(checkboxes)
    .filter(c => c.checked)
    .map(c => c.value);

    const filtradas = ciudades.filter(ciudad => {
    const textoOK =
        ciudad.name.toLowerCase().includes(texto) ||
        ciudad.pais.toLowerCase().includes(texto);

    const continenteOK =
        continente === "todos" || ciudad.continente === continente;

    const transporteOK =
        transportesMarcados.length === 0 ||
        transportesMarcados.some(t => ciudad.transportes.includes(t));

    return textoOK && continenteOK && transporteOK;
    });

    renderizarDestinos(filtradas);
}
