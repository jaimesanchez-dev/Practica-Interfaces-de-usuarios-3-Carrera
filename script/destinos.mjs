// destinos.mjs

// Función auxiliar para obtener favoritos del usuario actual
function obtenerFavoritosUsuario() {
    const usuario = localStorage.getItem("currentUser");
    if (!usuario) return [];

    // Cargamos todos los favoritos por usuario desde localStorage
    const todosFavoritos = JSON.parse(localStorage.getItem("favoritos_por_usuario")) || {};
    return todosFavoritos[usuario] || [];
}

// Función auxiliar para guardar favoritos del usuario actual en el localStorage
function guardarFavoritosUsuario(favoritos) {
    const usuario = localStorage.getItem("currentUser");
    if (!usuario) return;

    const todosFavoritos = JSON.parse(localStorage.getItem("favoritos_por_usuario")) || {};
    todosFavoritos[usuario] = favoritos;  // actualizamos solo los del usuario actual
    localStorage.setItem("favoritos_por_usuario", JSON.stringify(todosFavoritos));
}

// Rellena la información de un destino en la página de producto
export function rellenar_info_destino(datos_ciudad) {
    if (!datos_ciudad) return;

    // Obtenemos la moneda actual
    const moneda = localStorage.getItem("moneda") || "EUR";
    const conversion = { EUR: 1, USD: 1.08, YEN: 144};
    const simbolos = {EUR: "€", USD: "$", YEN: "¥"};

    const precioConvertido =(datos_ciudad.precio * conversion[moneda]).toFixed(0);
    
    // Actualizar elementos de la página
    document.querySelector(".producto-nombre").textContent =`${datos_ciudad.nombre} , ${datos_ciudad.pais}`;
    document.querySelector(".producto-precio").textContent =`${precioConvertido}${simbolos[moneda]}`;
    document.querySelector(".producto-descripcion").textContent =datos_ciudad.descripcion;
    document.querySelector(".producto-imagen").src =datos_ciudad.imagen.url;
    document.querySelector(".producto-imagen").alt =datos_ciudad.imagen.alt;

    // Marcar los transportes disponibles para esta ciudad
    document.querySelectorAll(".caracteristica").forEach(cb => {cb.checked = datos_ciudad.transportes.includes(cb.value);
    });
}

// Busca y devuelve los datos de una ciudad por nombre
export async function encontrarCiudad(nombre_ciudad) {
    let datospaises;
    try {
        // Cargamos el JSON de ciudades
        const response = await fetch('../ciudades-del-mundo.json');
        datospaises = await response.json();
    } catch (error) {
        console.error("Error al cargar el JSON de ciudades:", error);
        return null;
    }

    // Recorrer continentes, países y ciudades
    for (const continente of datospaises.continents) {
        for (const pais of continente.countries) {
            for (const ciudad of pais.cities) {
                // Buscamos tanto por nombre original como por nombre en inglés
                if (ciudad.name.toLowerCase() === nombre_ciudad.toLowerCase() ||
                    (ciudad.name_en && ciudad.name_en.toLowerCase() === nombre_ciudad.toLowerCase())) {
                    
                    // Obtener idioma del usuario
                    const idioma = localStorage.getItem("idioma") || "es";
                    const isEn = idioma === "en";
                    
                    // Devolver objeto con datos de la ciudad según el idioma
                    return {
                        pais: isEn && pais.name_en ? pais.name_en : pais.name,
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

// Carga los favoritos del usuario y los renderiza en la página
export async function cargarFavoritos() {
    // Obtener favoritos del usuario actual
    let favoritos = obtenerFavoritosUsuario();
    const listaContainer = document.getElementById("lista-favoritos");
    const mensajeVacio = document.getElementById("mensaje-vacio");

    listaContainer.innerHTML = ""; // limpiamos el contenedor
    if (favoritos.length === 0) {
        // Mostrar mensaje si no hay favoritos
        if (mensajeVacio) {
            listaContainer.appendChild(mensajeVacio);
            mensajeVacio.style.display = "block";
        }
        return;
    }

    if (mensajeVacio) mensajeVacio.style.display = "none"; // ocultar mensaje

    // Iteramos sobre los favoritos
    for (const favItem of favoritos) {
        // Buscamos la ciudad usando el nombre original guardado
        const datosCiudad = await encontrarCiudad(favItem.nombre); 

        if (datosCiudad) {
            // Si encontramos la ciudad, mostramos su info
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("favorito-item");

            // Guardamos el nombre original como data-attribute
            itemDiv.innerHTML = `
                <button class="boton-corazon-fav" data-nombre-original="${favItem.nombre}">
                    <img src="images/corazon-negro-rojo.png" alt="Quitar de favoritos">
                </button>
                <div class="favorito-info">
                    <h2 class="nombre-favorito">${datosCiudad.nombre}</h2>
                    <p>${datosCiudad.descripcion}</p>
                </div>
            `;
            listaContainer.appendChild(itemDiv);

            // Al hacer click en el nombre del destino
            const nombreH2 = itemDiv.querySelector(".nombre-favorito");
            nombreH2.addEventListener("click", () => {
                // Guardamos el destino en localStorage
                localStorage.setItem("destinoSeleccionado", datosCiudad.nombre_es);
                // Redirigimos a la página de compra
                window.location.href = "ComprarProducto.html";
        });
        } else {
            // Si no encontramos info de la ciudad, solo mostramos el nombre
            console.warn(`No se encontraron detalles para el favorito: ${favItem.nombre}`);
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("favorito-item");
            itemDiv.innerHTML = `
                <button class="boton-corazon-fav" data-nombre-original="${favItem.nombre}">
                    <img src="images/corazon-negro-rojo.png" alt="Quitar de favoritos">
                </button>
                <div class="favorito-info">
                    <h2 class="nombre-favorito">${favItem.nombre}</h2>
                    <p>Descripción no disponible.</p>
                </div>
            `;
            listaContainer.appendChild(itemDiv);

            const nombreH2 = itemDiv.querySelector(".nombre-favorito");
            nombreH2.addEventListener("click", () => {
                localStorage.setItem("destinoSeleccionado", favItem.nombre);
                window.location.href = "ComprarProducto.html";
            });
        }
    }

    eliminarFavorito(); // Inicializa los botones para eliminar favoritos
}

// Configura los botones para eliminar favoritos
export function eliminarFavorito() {
    let favoritos = obtenerFavoritosUsuario();
    const buttons = document.querySelectorAll(".boton-corazon-fav");

    buttons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const nombreToRemove = btn.dataset.nombreOriginal; // obtener el nombre original
            favoritos = favoritos.filter(f => f.nombre !== nombreToRemove); // eliminamos del array
            guardarFavoritosUsuario(favoritos); // guardamos los cambios
            await cargarFavoritos(); // recargamos la lista de favoritos
        });
    });
}

// Carga y muestra las reseñas de una ciudad en la página de producto
export function cargarReseñasCiudad(ciudad) {
    const bloques_reseñas = document.querySelectorAll(".reseña-item");

    const ultimas_reseñas = JSON.parse(localStorage.getItem("ultimas_reseñas")) || {};
    const reseñas_ciudad = ultimas_reseñas[ciudad] || [];
    
    // Iteramos sobre cada bloque de reseña
    for (let i = 0; i < bloques_reseñas.length; i++) {
        const bloque = bloques_reseñas[i];
        const datos = reseñas_ciudad[i];

        if (!datos) {
            // Si no hay reseña, ocultar bloque
            bloque.style.display = "none";
            continue;
        }

        // Rellenar datos de la reseña
        bloque.querySelector(".reseña-titulo").textContent = datos.titulo;
        bloque.querySelector(".reseña-texto").textContent = datos.descripcion;
        bloque.querySelector(".usuario-imagen").src = datos.imagen;
        bloque.querySelector(".usuario-nombre").textContent = datos.usuario;

        // Mostrar las estrellas correctas
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