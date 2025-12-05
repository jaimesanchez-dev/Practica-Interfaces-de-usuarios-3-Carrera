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

export function boton_favoritos_home() {
    const botones = document.querySelectorAll(".boton-corazon");

    // Start with correct state
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    botones.forEach(boton => {
        const tarjeta = boton.closest(".tarjeta-experiencia");
        if (tarjeta) {
            const nombre = tarjeta.querySelector(".tarjeta-experiencia-abajo").innerText;
            if (favoritos.some(f => f.nombre === nombre)) {
                const img = boton.querySelector("img");
                img.src = "images/corazon-negro-rojo.png"; // Active state
            }
        }
    });


    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent triggering card click if any
            const img = boton.querySelector("img");
            const tarjeta = boton.closest(".tarjeta-experiencia");
            const nombre = tarjeta.querySelector(".tarjeta-experiencia-abajo").innerText;

            // We can't easily get the description here without parsing more HTML or fetching JSON. 
            // For now, let's just store the name. The Favorites page will fetch details from JSON based on name/ID.
            // Wait, existing logic stores {nombre, descripcion}. 
            // Let's try to find a description or just store name and let Favoritos.js handle the lookup.
            // Looking at Home.html logic, there isn't a description visible in the card, only name.

            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            const yaEsFavorito = favoritos.some(f => f.nombre === nombre);

            if (yaEsFavorito) {
                favoritos = favoritos.filter(f => f.nombre !== nombre);
                img.src = "images/corazon.png"; // Back to original empty heart
            } else {
                favoritos.push({ nombre }); // Only name available here
                img.src = "images/corazon-negro-rojo.png";
            }
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        });
    });
}
