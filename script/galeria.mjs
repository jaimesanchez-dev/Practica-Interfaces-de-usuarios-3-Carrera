// galeria.mjs

// Array global que almacenará todas las ciudades cargadas del JSON
let todasLasCiudades = [];

const contenedor = document.getElementById("galeriaDestinos");
const plantilla = document.getElementById("plantillaDestino");

// Carga los datos del JSON y renderiza todos los destinos
export async function iniciarGaleria() {
    await cargarCiudades();
    renderizarDestinos(todasLasCiudades);
}

// Devuelve el array de todas las ciudades cargadas
export function getCiudades() {
    return todasLasCiudades;
}

// Renderiza la lista de destinos en el contenedor principal
export function renderizarDestinos(lista) {
    // Limpiamos el contenedor antes de renderizar
    contenedor.innerHTML = "";

    const idioma = localStorage.getItem("idioma") || "es"; // obtenemos el idioma actual
    const moneda = localStorage.getItem("moneda") || "EUR"; // obtenemos la moneda actual
    const isEn = idioma === "en";

    // Tasas de conversión respecto a EUR
    const conversion = {EUR: 1, USD: 1.08, YEN: 144};

    // Símbolos para cada moneda
    const simbolos = {EUR: "€", USD: "$", YEN: "¥"};

    // Mostrar mensaje si la lista está vacía
    if (lista.length === 0) {
        contenedor.innerHTML = isEn ? "<p>No destinations found.</p>" : "<p>No se encontraron destinos.</p>";
        return;
    }

    // Iterar sobre cada ciudad y clonar la plantilla para crear tarjetas
    lista.forEach(ciudad => {
        const clone = plantilla.content.cloneNode(true);

        clone.querySelector(".imagen-destino").src = ciudad.image.url;
        clone.querySelector(".imagen-destino").alt = `Ciudad: ${ciudad.image.alt}`;

        // Nombre del destino según el idioma
        if (isEn && ciudad.name_en) {
            clone.querySelector(".nombre-destino").textContent = ciudad.name_en;
        } else {
            clone.querySelector(".nombre-destino").textContent = ciudad.name;
        }

        // Convertimos el precio según la moneda seleccionada
        const precioConvertido = (ciudad.precio * conversion[moneda]).toFixed(0);
        clone.querySelector(".precio-destino").textContent = `${precioConvertido}${simbolos[moneda]}`;

        // Evento click en la tarjeta: guardar destino seleccionado y redirigir
        clone.querySelector(".tarjeta-destino").addEventListener("click", () => {
            const nombre = ciudad.name.split(",")[0].trim();
            localStorage.setItem("destinoSeleccionado", nombre);
            window.location.href = "ComprarProducto.html";
        });
        // Añadir la tarjeta al contenedor
        contenedor.appendChild(clone);
    });
}

// Función que obtiene los datos de las ciudades desde el JSON y llena el array global
async function cargarCiudades() {
    try {
        const res = await fetch("../ciudades-del-mundo.json");
        const data = await res.json();

        // Iterar por continentes, países y ciudades
        data.continents.forEach(cont => {
            cont.countries.forEach(pais => {
                pais.cities.forEach(ciudad => {
                    todasLasCiudades.push({
                        name: ciudad.name,                  // nombre original
                        name_en: ciudad.name_en,            // nombre en inglés
                        description: ciudad.description,    // descripción en español
                        description_en: ciudad.description_en, // descripción en inglés
                        image: ciudad.image,                // {url, alt}
                        transportes: ciudad.transportes,    // array de transportes disponibles
                        precio: ciudad.precio,              // precio base en EUR
                        pais: pais.name,                    // nombre del país
                        pais_en: pais.name_en,              // nombre del país en inglés
                        continente: cont.name               // nombre del continente
                    });
                });
            });
        });
    } catch (err) {
        console.error("Error cargando JSON:", err);
    }
}
