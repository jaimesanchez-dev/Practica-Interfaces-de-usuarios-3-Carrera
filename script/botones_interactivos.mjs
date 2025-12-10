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

        // Obtenemos el nombre del destino mostrado actualmente (solo la primera parte antes de la coma si la hay)
        const nombreCompleto = document.querySelector(".producto-nombre").innerText;
        const nombre = nombreCompleto.split(",")[0].trim();

        // Ya no necesitamos la descripción aquí
        // const descripcion = document.querySelector(".producto-descripcion").innerText;

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
            // SOLO guardamos el nombre, la descripción se carga dinámicamente
            favoritos.push({
                nombre
            });
            img.src = "images/corazon-negro-rojo.png";
        }

        // Guardamos el array actualizado en localStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    });
}

export function boton_favoritos_home() {
    const botones = document.querySelectorAll(".boton-corazon");

    // Empieza con el estado correcto
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    botones.forEach(boton => {
        const tarjeta = boton.closest(".tarjeta-experiencia");
        if (tarjeta) {
            const texto = tarjeta.querySelector(".tarjeta-experiencia-abajo").innerText;
            const nombre = texto.split(",")[0].trim();
            if (favoritos.some(f => f.nombre === nombre)) {
                const img = boton.querySelector("img");
                img.src = "images/corazon-negro-rojo.png"; // Active state
            }
        }
    });


    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            e.stopPropagation(); // Previene que se active el evento de la tarjeta
            const img = boton.querySelector("img");
            const tarjeta = boton.closest(".tarjeta-experiencia");
            const texto = tarjeta.querySelector(".tarjeta-experiencia-abajo").innerText;
            const nombre = texto.split(",")[0].trim();

            // Solo guardamos el nombre. La página de Favoritos se encargará de buscar la info en el JSON.


            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            const yaEsFavorito = favoritos.some(f => f.nombre === nombre);

            if (yaEsFavorito) {
                favoritos = favoritos.filter(f => f.nombre !== nombre);
                img.src = "images/corazon.png"; // Desactivado
            } else {
                favoritos.push({ nombre }); // Solo el nombre
                img.src = "images/corazon-negro-rojo.png"; // Activado
            }
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
        });
    });
}
