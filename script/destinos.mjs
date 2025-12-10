// destinos.mjs
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
    // Cargar el JSON de ciudades y controlamos errores
    try {
        const response = await fetch('./ciudades-del-mundo.json');
        datospaises = await response.json();
    } catch (error) {
        console.error("Error al cargar el JSON de ciudades:", error);
        return null;
    }
    // Buscar la ciudad en el JSON
    for (const continente of datospaises.continents) {
        for (const pais of continente.countries) {
            for (const ciudad of pais.cities) {
                if (ciudad.name.toLowerCase() === nombre_ciudad.toLowerCase()) {
                    return {
                        // Devolvemos todos los datos de la ciudad
                        pais: pais.name,
                        nombre: ciudad.name,
                        descripcion: ciudad.description,
                        imagen: ciudad.image,
                        transportes: ciudad.transportes,
                        precio: ciudad.precio,
                    };
                }
            }
        }
    }
    //Si no se encuentra la ciudad, devolver null
    return null;
}


export async function cargarFavoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
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
        // Buscamos los detalles completos en el JSON usando el nombre
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
            // Opcional: Mostrar tarjeta simple si falla la carga
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

    // Importante: Re-asociar los eventos de eliminación a los nuevos botones
    eliminarFavorito();
}

export function eliminarFavorito() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    const buttons = document.querySelectorAll(".boton-corazon-fav");
    buttons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const nombreToRemove = btn.dataset.nombre;
            // Lo eliminamos de la lista de favoritos
            favoritos = favoritos.filter(f => f.nombre !== nombreToRemove);
            // Actualizamos en el localStorage
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            // Volvemos a cargar la lista
            await cargarFavoritos();
        });
    });
}
