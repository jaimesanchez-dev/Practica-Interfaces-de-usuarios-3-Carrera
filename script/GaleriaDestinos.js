// GaleriaDestinos.js

document.addEventListener("DOMContentLoaded", async () => {
    // Controlamos a que páginas puede acceder el usuario si no ha iniciado sesión
    const user = localStorage.getItem("currentUser");
    const consejosLink = document.getElementById("link-consejos");
    const perfilLink = document.getElementById("link-perfil");
    const contactoLink = document.getElementById("link-contacto");
    consejosLink.addEventListener("click", (e) => {
        if (!user) {
            e.preventDefault();
            alert("Debes iniciar sesión para acceder a la página de consejos.");
        }
    });
    perfilLink.addEventListener("click", (e) => {
        if (!user) {
            e.preventDefault();
            alert("Debes iniciar sesión para acceder a la página del perfil.");
        }
    });
    contactoLink.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Esta opción no está implementada");
    });

    
    // Variables globales para guardar los datos
    let todasLasCiudades = [];
    
    // Elementos del DOM
    const contenedor = document.getElementById("galeriaDestinos");
    const plantilla = document.getElementById("plantillaDestino");
    const buscadorInput = document.getElementById("buscadorInput");
    const selectContinente = document.getElementById("filtroContinente");
    const checkboxes = document.querySelectorAll(".filtro-check");

    // 1. CARGA DE DATOS
    try {
        const res = await fetch("../ciudades-del-mundo.json");
        const data = await res.json();

        // "Aplanamos" el JSON: Convertimos la estructura jerárquica en una lista simple de ciudades
        // Esto facilita mucho el filtrado posterior
        data.continents.forEach(cont => {
            cont.countries.forEach(pais => {
                pais.cities.forEach(ciudad => {
                    todasLasCiudades.push({
                        name: ciudad.name,
                        description: ciudad.description,
                        image: ciudad.image,
                        transportes: ciudad.transportes,
                        precio: ciudad.precio,
                        pais: pais.name,
                        continente: cont.name
                    });
                });
            });
        });

        // Pintamos todo inicialmente
        renderizarDestinos(todasLasCiudades);

    } catch (error) {
        console.error("Error cargando el JSON:", error);
    }

    // 2. FUNCIÓN DE RENDERIZADO (PINTAR)
    function renderizarDestinos(listaCiudades) {
        // Limpiamos el contenedor antes de pintar los nuevos resultados
        contenedor.innerHTML = "";

        if (listaCiudades.length === 0) {
            contenedor.innerHTML = "<p>No se encontraron destinos con esos filtros.</p>";
            return;
        }

        listaCiudades.forEach(ciudad => {
            const clone = plantilla.content.cloneNode(true);

            clone.querySelector(".imagen-destino").src = ciudad.image.url;
            clone.querySelector(".imagen-destino").alt = ciudad.image.alt;
            clone.querySelector(".nombre-destino").textContent = ciudad.name;
            clone.querySelector(".precio-destino").textContent = ciudad.precio + "€";

            // Evento click para guardar en LocalStorage
            clone.querySelector(".tarjeta-destino").addEventListener("click", () => {
                const nombre_ciudad = ciudad.name.split(",")[0].trim();
                localStorage.setItem("destinoSeleccionado", nombre_ciudad);
                window.location.href = "ComprarProducto.html";
            });

            contenedor.appendChild(clone);
        });
    }

    // 3. LÓGICA DE FILTRADO
    function aplicarFiltros() {
        // A. Obtener valor del buscador (en minúsculas para comparar bien)
        const textoBusqueda = buscadorInput.value.toLowerCase();

        // B. Obtener valor del continente
        const continenteSeleccionado = selectContinente.value;

        // C. Obtener transportes marcados
        // Creamos un array con los values de los checkbox que esten checked (ej: ['tren', 'avion'])
        const transportesMarcados = Array.from(checkboxes)
                                         .filter(chk => chk.checked)
                                         .map(chk => chk.value);

        // D. Filtrar el array maestro 'todasLasCiudades'
        const ciudadesFiltradas = todasLasCiudades.filter(ciudad => {
            
            // 1. Filtro Texto (Nombre ciudad o País)
            const coincideTexto = ciudad.name.toLowerCase().includes(textoBusqueda) || 
                                  ciudad.pais.toLowerCase().includes(textoBusqueda);

            // 2. Filtro Continente
            const coincideContinente = continenteSeleccionado === "todos" || 
                                       ciudad.continente === continenteSeleccionado;

            // 3. Filtro Transporte
            // La ciudad debe tener AL MENOS UNO de los transportes marcados.
            // ciudad.transportes es un array en el JSON (ej: ["tren", "avion"])
            // transportesMarcados es lo que el usuario quiere (ej: ["tren"])
            // Usamos .some() para ver si hay intersección.
            const coincideTransporte = transportesMarcados.some(t => ciudad.transportes.includes(t));

            // Para que pase el filtro, debe cumplir LAS TRES condiciones
            return coincideTexto && coincideContinente && coincideTransporte;
        });

        // Volvemos a pintar con la lista filtrada
        renderizarDestinos(ciudadesFiltradas);
    }

    // 4. EVENT LISTENERS (Escuchar cambios)
    
    // Al escribir en el buscador
    buscadorInput.addEventListener("input", aplicarFiltros);
    
    // Al cambiar el select de continente
    selectContinente.addEventListener("change", aplicarFiltros);

    // Al clicar cualquier checkbox
    checkboxes.forEach(chk => {
        chk.addEventListener("change", aplicarFiltros);
    });

});

