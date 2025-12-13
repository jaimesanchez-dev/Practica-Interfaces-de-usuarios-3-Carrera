// formulario.mjs

import { validarFormulario } from "./validaciones.mjs";
import { encontrarCiudad } from "./destinos.mjs";
import { aplicarIdioma } from "./idioma.mjs";


export function mostrarSeccionesFormulario() {
    // Checkbox
    const cbAcompanantes = document.getElementById("cbAcompanantes");
    const cbMascotas = document.getElementById("cbMascotas");
    const cbAlergias = document.getElementById("cbAlergias");

    // Contenedores
    const contAcompanantes = document.getElementById("contenedorAcompanantes");
    const contMascotas = document.getElementById("contenedorMascotas");
    const contAlergias = document.getElementById("contenedorAlergias");

    // Mostar u ocultar acompañantes
    cbAcompanantes.addEventListener("change", () => {
        if (cbAcompanantes.checked) {
            contAcompanantes.classList.remove("oculto");
            contAcompanantes.classList.add("mostrar");
            generarAcompanantes();
        } else {
            contAcompanantes.classList.remove("mostrar");
            contAcompanantes.classList.add("oculto");
        }
    });

    // Mostar u ocultar mascotas
    cbMascotas.addEventListener("change", () => {
        if (cbMascotas.checked) {
            contMascotas.classList.remove("oculto");
            setTimeout(() => contMascotas.classList.add("mostrar"), 10);
        } else {
            contMascotas.classList.remove("mostrar");
            setTimeout(() => contMascotas.classList.add("oculto"), 400);
        }
    });

    // Mostar u ocultar alergias
    cbAlergias.addEventListener("change", () => {
        if (cbAlergias.checked) {
            contAlergias.classList.remove("oculto");
            setTimeout(() => contAlergias.classList.add("mostrar"), 10);
        } else {
            contAlergias.classList.remove("mostrar");
            setTimeout(() => contAlergias.classList.add("oculto"), 400);
        }
    });
}

export function inicializarAcompañantes() {
    // Acompañantes dinámicos
    const numAcompanantes = document.getElementById("numAcompanantes");

    numAcompanantes.addEventListener("change", generarAcompanantes);
}

function generarAcompanantes() {
    // Checkbox
    const cbAcompanantes = document.getElementById("cbAcompanantes");
    
    // Acompañantes dinámicos
    const numAcompanantes = document.getElementById("numAcompanantes");
    const listaAcompanantes = document.getElementById("listaAcompanantes");
    
    listaAcompanantes.innerHTML = "";

    if (!cbAcompanantes.checked) return;

    const cantidad = parseInt(numAcompanantes.value);

    for (let i = 1; i <= cantidad; i++) {

        // Grupo individual de acompañante
        const div = document.createElement("div");
        div.classList.add("acompanante-group");

        div.innerHTML = `
            <label><b data-i18n="acompañante">Acompañante ${i}</b></label>

            <!-- Nombre de acompañante -->
            <input 
                type="text" 
                data-i18n="nombre_acompañante"
                class="registro" 
                name="acompanante_nombre_${i}" 
                placeholder="Nombre del acompañante ${i}"
            >

            <!-- Correo de acompañante -->
            <input 
                type="email"
                data-i18n="correo_acompañante" 
                class="registro" 
                name="acompanante_correo_${i}" 
                placeholder="Correo del acompañante ${i}"
            >
        `;
        
        listaAcompanantes.appendChild(div);
        // Aplicamos traducciones para que al recargar no se pierdan
        aplicarIdioma(localStorage.getItem("idioma") || "es");
    }
}

export function realizarCompra() {

    // Verificamos la validación antes de comprar
    if (!validarFormulario()) {
        return;
    }

    // Obtenemos el destino seleccionado
    const destino = localStorage.getItem("destinoSeleccionado");
    if (!destino) return;

    // Obtenemos el usuario actual
    const currentUser = localStorage.getItem("currentUser"); // username del usuario

    // Obtenemos la lista de destinos comprados o, si no existe, iniciamos un array vacío
    let destinosComprados = JSON.parse(localStorage.getItem("compras_" + currentUser)) || [];

    // Si no se ha comprado antes el destino (es decir, no está en la lista), lo añadimos
    if (!destinosComprados.includes(destino)) {
        destinosComprados.push(destino);
    }

    // Guardamos la lista actualizada en localStorage
    localStorage.setItem("compras_" + currentUser, JSON.stringify(destinosComprados));

    alert("¡Compra realizada con éxito!");

    // Redirigimos a la página Home
    window.location.href = "Home.html";
}


export async function cargarTransportes() {
    // Selector de transporte del formulario
    const selectTransporte = document.getElementById("transporte");

    // Obtenemos el destino seleccionado
    const destino = localStorage.getItem("destinoSeleccionado");
    if (!destino) {
        console.error("No se encontró destinoSeleccionado en localStorage");
        return;
    }

    // Buscamos la ciuadad en el JSON
    const ciudad = await encontrarCiudad(destino);

    if (!ciudad) {
        console.error("Ciudad no encontrada en el JSON");
        return;
    }

    // Limpiamos el select
    selectTransporte.innerHTML = "";

    // Añadimos los transportes disponibles
    ciudad.transportes.forEach(t => {
        const option = document.createElement("option");
        option.value = t;
        option.textContent = t;
        if (t === "barco") {option.setAttribute("data-i18n", "barco");}
        if (t === "autobus") {option.setAttribute("data-i18n", "autobus");}
        if (t === "avion") {option.setAttribute("data-i18n", "avion");}
        if (t === "tren") {option.setAttribute("data-i18n", "tren");}
        selectTransporte.appendChild(option);
    });
    // Aplicamos traducciones para que al recargar no se pierdan
    aplicarIdioma(localStorage.getItem("idioma") || "es");


    // Si solo hay 1 transporte, bloqueamos selector
    if (ciudad.transportes.length === 1) {
        selectTransporte.disabled = true;
    } else {
        selectTransporte.disabled = false;
    }
}
