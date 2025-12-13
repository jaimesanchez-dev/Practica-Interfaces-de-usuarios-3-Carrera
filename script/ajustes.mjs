// ajustes.mjs

export function inicializarToggles() {
    const toggleDaltonismo = document.getElementById("toggle-daltonismo");
    const toggleModoOscuro = document.getElementById("toggle-modo-oscuro");

    if (toggleDaltonismo) {
        toggleDaltonismo.addEventListener("click", () => {
            toggleDaltonismo.classList.toggle("active");
            const activado = toggleDaltonismo.classList.contains("active");
            window.actualizarTema("daltonico", activado);
        });
    }

    if (toggleModoOscuro) {
        toggleModoOscuro.addEventListener("click", () => {
            toggleModoOscuro.classList.toggle("active");
            const activado = toggleModoOscuro.classList.contains("active");
            window.actualizarTema("oscuro", activado);
        });
    }
}

export function cargarEstadoToggles() {
    const toggleDaltonismo = document.getElementById("toggle-daltonismo");
    const toggleModoOscuro = document.getElementById("toggle-modo-oscuro");

    if (localStorage.getItem("modo-daltonico") === "true" && toggleDaltonismo) {
        toggleDaltonismo.classList.add("active");
    }

    if (localStorage.getItem("modo-oscuro") === "true" && toggleModoOscuro) {
        toggleModoOscuro.classList.add("active");
    }
}
