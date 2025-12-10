

document.addEventListener("DOMContentLoaded", () => {

    const botonComprar = document.querySelector(".but_comprar");
    if (botonComprar) {
        botonComprar.addEventListener("click", () => {

            // Obtenemos el destino seleccionado
            const destino = localStorage.getItem("destinoSeleccionado");
            if (!destino) return;

             // Obtenemos el usuario actual
            const currentUser = localStorage.getItem("currentUser"); // username del usuario

            // Obtenemos la lista de destinos comprados o si no existe, iniciamos un array vacío
            let destinosComprados = JSON.parse(localStorage.getItem("compras_" + currentUser)) || [];

            // Si no se ha comprado antes el destino (es decir, no está en la lista), lo añadimos
            if (!destinosComprados.includes(destino)) {
                destinosComprados.push(destino);
            }

            // Guardamos la lista actualizada en localStorage
            localStorage.setItem("compras_" + currentUser, JSON.stringify(destinosComprados));

            // Redirigimos a la página Home
            window.location.href = "Home.html";
        });
    }
});
