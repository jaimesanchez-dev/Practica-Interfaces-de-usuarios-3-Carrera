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
    const img = boton.querySelector("img");

    const nombre = document.querySelector(".producto-nombre").innerText;
    const descripcion = document.querySelector(".producto-descripcion").innerText;

    // Cargamos los favoritos existentes
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Comprobar si este producto ya es favorito
    const YaEsFavorito = favoritos.some(f => f.nombre === nombre);

    if (YaEsFavorito) {
        img.src = "images/corazon negro-rojo.png";
    }

    boton.addEventListener("click", () => {

        // Si ya estaba en favoritos lo "eliminamos" del localStorage
        if (favoritos.some(f => f.nombre === nombre)) {
            // filter() crea un array nuevo sin ese elemento
            favoritos = favoritos.filter(f => f.nombre !== nombre);
            img.src = "images/corazon negro.png";
        } 
        // Si no estaba, lo añadimos
        else {
            favoritos.push({
                nombre: nombre,
                descripcion: descripcion
            });
            img.src = "images/corazon negro-rojo.png";
        }

        // Guardamos el array modificado entero en el LocalStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    });
}
