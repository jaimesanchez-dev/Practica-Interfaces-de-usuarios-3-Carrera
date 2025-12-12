// formulario.mjs
import { validarFormulario } from "./validaciones.mjs";

export function mostrarSeccionesFormulario() {
    // Checkbox
    const cbAcompanantes = document.getElementById("cbAcompanantes");
    const cbMascotas = document.getElementById("cbMascotas");
    const cbAlergias = document.getElementById("cbAlergias");
    // Contenedores
    const contAcompanantes = document.getElementById("contenedorAcompanantes");
    const contMascotas = document.getElementById("contenedorMascotas");
    const contAlergias = document.getElementById("contenedorAlergias");

    // Mostrar u ocultar acompañantes
    cbAcompanantes.addEventListener("change", () => {
        contAcompanantes.classList.toggle("oculto", !cbAcompanantes.checked);
        generarAcompanantes();
    });

    // Mostrar u ocultar mascotas
    cbMascotas.addEventListener("change", () => {
        contMascotas.classList.toggle("oculto", !cbMascotas.checked);
    });

    // Mostrar u ocultar alergias
    cbAlergias.addEventListener("change", () => {
        contAlergias.classList.toggle("oculto", !cbAlergias.checked);
    });
}

export function inicializarAcompañantes() {
    // Acompañantes dinámicos
    const numAcompanantes = document.getElementById("numAcompanantes");

    numAcompanantes.addEventListener("change", generarAcompanantes);
}

export function generarAcompanantes() {
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
            <label><b>Acompañante ${i}</b></label>

            <!-- Nombre de acompañante -->
            <input 
                type="text" 
                class="registro" 
                name="acompanante_nombre_${i}" 
                placeholder="Nombre del acompañante ${i}"
            >

            <!-- Correo de acompañante -->
            <input 
                type="email" 
                class="registro" 
                name="acompanante_correo_${i}" 
                placeholder="Correo del acompañante ${i}"
            >
        `;

        listaAcompanantes.appendChild(div);
    }
}

export function realizarCompra() {

    // Verificamos la validación antes de comprar
    if (!validarFormulario()) {
        alert("Hay errores en el formulario. Revísalo.");
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
