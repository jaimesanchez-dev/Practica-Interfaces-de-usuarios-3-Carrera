// destinos.mjs

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

export function rellenar_info_destino(datos_ciudad) {
    if (datos_ciudad) {
        document.querySelector(".producto-nombre").textContent = `${datos_ciudad.nombre} , ${datos_ciudad.pais}`;
        document.querySelector(".producto-precio").textContent = `${datos_ciudad.precio} €`;
        document.querySelector(".producto-descripcion").textContent = datos_ciudad.descripcion;
        document.querySelector(".producto-imagen").src = datos_ciudad.imagen.url;
        document.querySelector(".producto-imagen").alt = datos_ciudad.imagen.alt;

        const listaTransportes = datos_ciudad.transportes || [];

        document.querySelectorAll(".caracteristica").forEach(checkbox => {
            checkbox.checked = listaTransportes.includes(checkbox.value);
        });
    }
}

export async function encontrarCiudad(nombre_ciudad) {
    let datospaises;
    try {
        const response = await fetch('../ciudades-del-mundo.json');
        datospaises = await response.json();
    } catch (error) {
        console.error("Error al cargar el JSON de ciudades:", error);
        return null;
    }
    
    for (const continente of datospaises.continents) {
        for (const pais of continente.countries) {
            for (const ciudad of pais.cities) {
                if (ciudad.name.toLowerCase() === nombre_ciudad.toLowerCase()) {
                    const idioma = localStorage.getItem("idioma") || "es";
                    const isEn = idioma === "en";
                    return {
                        pais: pais.name,
                        nombre: isEn && ciudad.name_en ? ciudad.name_en : ciudad.name,
                        nombre_es: ciudad.name,
                        descripcion: isEn && ciudad.description_en ? ciudad.description_en : ciudad.description,
                        imagen: ciudad.image,
                        transportes: ciudad.transportes,
                        precio: ciudad.precio,
                        idioma: idioma
                    };
                }
            }
        }
    }
    return null;
}


export async function cargarFavoritos() {
    // Obtener favoritos del usuario actual
    let favoritos = obtenerFavoritosUsuario();
    const listaContainer = document.getElementById("lista-favoritos");
    const mensajeVacio = document.getElementById("mensaje-vacio");

    listaContainer.innerHTML = "";
    if (favoritos.length === 0) {
        if (mensajeVacio) {
            listaContainer.appendChild(mensajeVacio);
            mensajeVacio.style.display = "block";
        }
        return;
    }

    if (mensajeVacio) mensajeVacio.style.display = "none";

    for (const favItem of favoritos) {
        const datosCiudad = await encontrarCiudad(favItem.nombre);

        if (datosCiudad) {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("favorito-item");

            itemDiv.innerHTML = `
                <button class="boton-corazon-fav" data-nombre="${datosCiudad.nombre}">
                    <img src="images/corazon-negro-rojo.png" alt="Quitar de favoritos">
                </button>
                <div class="favorito-info">
                    <h2>${datosCiudad.nombre}</h2>
                    <p>${datosCiudad.descripcion}</p>
                </div>
            `;
            listaContainer.appendChild(itemDiv);
        } else {
            console.warn(`No se encontraron detalles para el favorito: ${favItem.nombre}`);
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("favorito-item");
            itemDiv.innerHTML = `
                <button class="boton-corazon-fav" data-nombre="${favItem.nombre}">
                    <img src="images/corazon-negro-rojo.png" alt="Quitar de favoritos">
                </button>
                <div class="favorito-info">
                    <h2>${favItem.nombre}</h2>
                    <p>Descripción no disponible.</p>
                </div>
            `;
            listaContainer.appendChild(itemDiv);
        }
    }

    eliminarFavorito();
}

export function eliminarFavorito() {
    let favoritos = obtenerFavoritosUsuario();
    const buttons = document.querySelectorAll(".boton-corazon-fav");
    buttons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const nombreToRemove = btn.dataset.nombre;
            favoritos = favoritos.filter(f => f.nombre !== nombreToRemove);
            guardarFavoritosUsuario(favoritos);
            await cargarFavoritos();
        });
    });
}

export function cargarReseñasCiudad(ciudad) {
    const bloques_reseñas = document.querySelectorAll(".reseña-item");

    const ultimas_reseñas = JSON.parse(localStorage.getItem("ultimas_reseñas")) || {};
    const reseñas_ciudad = ultimas_reseñas[ciudad] || [];

    for (let i = 0; i < bloques_reseñas.length; i++) {
        const bloque = bloques_reseñas[i];
        const datos = reseñas_ciudad[i];

        if (!datos) {
            bloque.style.display = "none";
            continue;
        }

        bloque.querySelector(".reseña-titulo").textContent = datos.titulo;
        bloque.querySelector(".reseña-texto").textContent = datos.descripcion;
        bloque.querySelector(".usuario-imagen").src = datos.imagen;
        bloque.querySelector(".usuario-nombre").textContent = datos.usuario;

        const estrellas = bloque.querySelectorAll(".estrella");
        for (let j = 0; j < estrellas.length; j++) {
            if (j < datos.estrellas) {
                estrellas[j].src = "images/estrella-rellena.png";
            } else {
                estrellas[j].src = "images/estrella-vacia.png";
            }
        }
    }
}