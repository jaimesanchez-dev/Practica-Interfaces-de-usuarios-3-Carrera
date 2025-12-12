// botones_interactivos.mjs

// Función para actualizar la visualización de estrellas en un contenedor dado:
export function actualizarEstrellas(contenedor, valor) {
    const botones = contenedor.querySelectorAll(".btn-estrella");
    
    botones.forEach(b => {
        const img = b.querySelector("img");
        if (b.dataset.pos <= valor) {
            img.src = "images/estrella-rellena.png";
        } else {
            img.src = "images/estrella-vacia.png";
        }
    });
}


// Función auxiliar para obtener favoritos del usuario actual
function obtenerFavoritosUsuario() {
    const usuario = localStorage.getItem("currentUser");
    if (!usuario) return [];
    
    const todosFavoritos = JSON.parse(localStorage.getItem("favoritos_por_usuario")) || {};
    return todosFavoritos[usuario] || [];
}
// Función auxiliar para guardar favoritos del usuario actual
function guardarFavoritosUsuario(favoritos) {
    const usuario = localStorage.getItem("currentUser");
    if (!usuario) return;
    
    const todosFavoritos = JSON.parse(localStorage.getItem("favoritos_por_usuario")) || {};
    todosFavoritos[usuario] = favoritos;
    localStorage.setItem("favoritos_por_usuario", JSON.stringify(todosFavoritos));
}
// Función para el botón de lista de favoritos en la página de producto
export function boton_lista_favoritos() {
    const boton = document.querySelector(".btn-corazon");
    if (!boton) return;
    
    const img = boton.querySelector("img");

    // Cargar estado inicial del favorito para este usuario
    const nombreCompleto = document.querySelector(".producto-nombre").innerText;
    const nombre = nombreCompleto.split(",")[0].trim();
    const favoritosUsuario = obtenerFavoritosUsuario();
    const esFavorito = favoritosUsuario.some(f => f.nombre === nombre);
    
    if (esFavorito) {
        img.src = "images/corazon-negro-rojo.png";
    } else {
        img.src = "images/corazon-negro.png";
    }

    boton.addEventListener("click", () => {
        const nombreCompleto = document.querySelector(".producto-nombre").innerText;
        const nombre = nombreCompleto.split(",")[0].trim();

        // Obtener favoritos del usuario actual
        let favoritosUsuario = obtenerFavoritosUsuario();

        const yaEsFavorito = favoritosUsuario.some(f => f.nombre === nombre);

        if (yaEsFavorito) {
            favoritosUsuario = favoritosUsuario.filter(f => f.nombre !== nombre);
            img.src = "images/corazon-negro.png";
        } else {
            favoritosUsuario.push({ nombre });
            img.src = "images/corazon-negro-rojo.png";
        }

        // Guardar favoritos actualizados del usuario
        guardarFavoritosUsuario(favoritosUsuario);
    });
}

// Función para el botón de lista de favoritos en la página de home
export function boton_favoritos_home() {
    const heartContainers = document.querySelectorAll(".heart-container");
    if (heartContainers.length === 0) return;

    // Función para actualizar el estado visual de un corazón
    function actualizarEstadoCorazon(container, esFavorito) {
        const checkbox = container.querySelector(".checkbox");
        if (checkbox) {
            checkbox.checked = esFavorito;
        }
    }

    // Cargar estado inicial para el usuario actual
    const favoritosUsuario = obtenerFavoritosUsuario();
    
    heartContainers.forEach(container => {
        const tarjeta = container.closest(".tarjeta-experiencia");
        if (tarjeta) {
            const texto = tarjeta.querySelector(".tarjeta-experiencia-abajo").innerText;
            const nombre = texto.split(",")[0].trim();
            const esFavorito = favoritosUsuario.some(f => f.nombre === nombre);
            actualizarEstadoCorazon(container, esFavorito);
        }
    });

    // Añadir eventos de click en los checkboxes
    heartContainers.forEach(container => {
        const checkbox = container.querySelector(".checkbox");
        if (!checkbox) return;

        checkbox.addEventListener("change", (e) => {
            const tarjeta = container.closest(".tarjeta-experiencia");
            if (!tarjeta) return;
            
            const texto = tarjeta.querySelector(".tarjeta-experiencia-abajo").innerText;
            const nombre = texto.split(",")[0].trim();

            let favoritosUsuario = obtenerFavoritosUsuario();
            const yaEsFavorito = favoritosUsuario.some(f => f.nombre === nombre);

            if (checkbox.checked && !yaEsFavorito) {
                // Añadir a favoritos
                favoritosUsuario.push({ nombre });
                guardarFavoritosUsuario(favoritosUsuario);
            } else if (!checkbox.checked && yaEsFavorito) {
                // Quitar de favoritos
                favoritosUsuario = favoritosUsuario.filter(f => f.nombre !== nombre);
                guardarFavoritosUsuario(favoritosUsuario);
            }
        });
    });
}