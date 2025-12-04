// botones_interactivos.mjs

export function boton_estrellas() {
    const grupos = document.querySelectorAll(".estrellas"); // Selecciona todos los contenedores de estrellas

    // Itera sobre cada grupo de estrellas
    grupos.forEach(grupo => {
        const botones = grupo.querySelectorAll(".btn-estrella");

        // Vemos la posicion de la estrella al hacer clic
        botones.forEach(boton => {
            boton.addEventListener("click", () => {
                const pos = boton.dataset.pos;

                // Rellenar las estrellas que tengan una posicion menor o igual a la clicada
                botones.forEach(b => {
                    const img = b.querySelector("img");
                    if (b.dataset.pos <= pos) {
                        img.src = "images/estrella-rellena.png";
                    } else {
                        img.src = "images/estrella-vacia.png";
                    }
                });
            });
        });
    });
}

export function boton_lista_favoritos() {

    const boton = document.querySelector(".btn-corazon");
    // Seleccionamos la imagen que hay dentro del botón
    const img = boton.querySelector("img");

    boton.addEventListener("click", () => {

        // Obtenemos el nombre del destino mostrado actualmente
        const nombre = document.querySelector(".producto-nombre").innerText;

        // Obtenemos la descripción del destino
        const descripcion = document.querySelector(".producto-descripcion").innerText;

        // Cargamos la lista de favoritos del localStorage y si no existe aún, devolvemos un array vacío
        let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        // Comprobamos si el destino ya está en favoritos
        // .some() devuelve true si encuentra un elemento con el mismo nombre
        const yaEsFavorito = favoritos.some(f => f.nombre === nombre);

        if (yaEsFavorito) {

            // filter() crea un array nuevo con todos los elementos de antes menos el que queremos eliminar
            favoritos = favoritos.filter(f => f.nombre !== nombre);
            img.src = "images/corazon-negro.png";
        } 
        else {
            // Añadimos un objeto con los datos del destino
            favoritos.push({ 
                nombre, 
                descripcion 
            });
            img.src = "images/corazon-negro-rojo.png";
        }

        // Guardamos el array actualizado en localStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    });
}
