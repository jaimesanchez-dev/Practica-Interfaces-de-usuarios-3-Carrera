// moneda.mjs

export function cargar_moneda(){
    // Seleccionamos el select de moneda
    const monedaSeleccionada = document.querySelector(".header-moneda");

    if (monedaSeleccionada) {
        // Cargamos la moneda guardada en localStorage al cargar la página
        const monedaGuardada = localStorage.getItem("moneda") || "EUR";
        if (monedaGuardada) {
            monedaSeleccionada.value = monedaGuardada;
        }

        // Guardamos la moneda seleccionada en localStorage cuando cambie
        monedaSeleccionada.addEventListener("change", () => {
            localStorage.setItem("moneda", monedaSeleccionada.value);
        });
    }
}