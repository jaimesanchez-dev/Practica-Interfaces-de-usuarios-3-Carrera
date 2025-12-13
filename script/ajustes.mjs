// ajustes.mjs

// Inicializa los toggles de accesibilidad (daltonismo y modo oscuro)
export function inicializarToggles() {
    const toggleDaltonismo = document.getElementById("toggle-daltonismo");
    const toggleModoOscuro = document.getElementById("toggle-modo-oscuro");

    // Toggle para modo daltonismo
    if (toggleDaltonismo) {
        toggleDaltonismo.addEventListener("click", () => {
            // Cambiamos el estado visual del toggle
            toggleDaltonismo.classList.toggle("active");
            const activado = toggleDaltonismo.classList.contains("active");
            
            // Actualizamos el tema global y lo guardamos en localStorage
            window.actualizarTema("daltonico", activado);
        });
    }

    // Toggle para modo oscuro
    if (toggleModoOscuro) {
        toggleModoOscuro.addEventListener("click", () => {
            // Cambiamos el estado visual del toggle
            toggleModoOscuro.classList.toggle("active");
            const activado = toggleModoOscuro.classList.contains("active");
            
            // Actualizamos el tema global y lo guardamos en localStorage
            window.actualizarTema("oscuro", activado);
        });
    }
}

// Carga el estado guardado de los toggles desde localStorage
export function cargarEstadoToggles() {
    const toggleDaltonismo = document.getElementById("toggle-daltonismo");
    const toggleModoOscuro = document.getElementById("toggle-modo-oscuro");

    // Activamos visualmente el toggle si el modo daltonismo estaba guardado
    if (localStorage.getItem("modo-daltonico") === "true" && toggleDaltonismo) {
        toggleDaltonismo.classList.add("active");
    }

    // Activamos visualmente el toggle si el modo oscuro estaba guardado
    if (localStorage.getItem("modo-oscuro") === "true" && toggleModoOscuro) {
        toggleModoOscuro.classList.add("active");
    }
}
