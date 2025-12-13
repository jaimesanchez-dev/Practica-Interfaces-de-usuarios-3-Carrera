// formulario.mjs

import { validarFormulario } from "./validaciones.mjs";
import { encontrarCiudad } from "./destinos.mjs";
import { aplicarIdioma } from "./idioma.mjs";

// Esta función controla los checkbox de Acompañantes, Mascotas y Alergias 
export function mostrarSeccionesFormulario() {
    // Referencias a los checkboxes del formulario
    const cbAcompanantes = document.getElementById("cbAcompanantes");
    const cbMascotas = document.getElementById("cbMascotas");
    const cbAlergias = document.getElementById("cbAlergias");

    // Contenedores que se mostrarán u ocultará
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
            contMascotas.classList.add("mostrar");
        } else {
            contMascotas.classList.remove("mostrar");
            contMascotas.classList.add("oculto");
        }
    });

    // Mostar u ocultar alergias
    cbAlergias.addEventListener("change", () => {
        if (cbAlergias.checked) {
            contAlergias.classList.remove("oculto");
            setTimeout(() => contAlergias.classList.add("mostrar"), 10);
        } else {
            contAlergias.classList.remove("mostrar");
            contAlergias.classList.add("oculto");
        }
    });
}

// Inicializa el listener para generar inputs de acompañantes según la cantidad seleccionada
export function inicializarAcompañantes() {
    // Acompañantes dinámicos
    const numAcompanantes = document.getElementById("numAcompanantes");

    numAcompanantes.addEventListener("change", generarAcompanantes);
}

// Crea dinámicamente inputs de nombre y correo para cada acompañante
function generarAcompanantes() {
    // Checkbox
    const cbAcompanantes = document.getElementById("cbAcompanantes");
    
    // Acompañantes dinámicos
    const numAcompanantes = document.getElementById("numAcompanantes");
    const listaAcompanantes = document.getElementById("listaAcompanantes");
    
    // Limpiamos la lista para regenerarla
    listaAcompanantes.innerHTML = "";

    if (!cbAcompanantes.checked) return; // si no está seleccionado, no hacemos nada

    const cantidad = parseInt(numAcompanantes.value);

    for (let i = 1; i <= cantidad; i++) {
        // Crear div contenedor para cada acompañante
        const div = document.createElement("div");
        div.classList.add("acompanante-group");

        // Añadir inputs de nombre y correo
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
        
        // Añadir al contenedor principal
        listaAcompanantes.appendChild(div);

        // Aplicamos traducciones para que al recargar no se pierdan
        aplicarIdioma(localStorage.getItem("idioma") || "es");
    }
}

export function realizarCompra() {

    // Validar el formulario antes de continuar
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

// Carga las opciones de transporte disponibles según la ciudad seleccionada
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
