// galeria.mjs

let todasLasCiudades = [];

const contenedor = document.getElementById("galeriaDestinos");
const plantilla = document.getElementById("plantillaDestino");

export async function iniciarGaleria() {
    await cargarCiudades();
    renderizarDestinos(todasLasCiudades);
}

export function getCiudades() {
    return todasLasCiudades;
}

export function renderizarDestinos(lista) {
    contenedor.innerHTML = "";

    const idioma = localStorage.getItem("idioma") || "es";
    const moneda = localStorage.getItem("moneda") || "EUR"; // obtenemos la moneda actual
    const isEn = idioma === "en";

    // Tasas de conversión respecto a EUR
    const conversion = {
        EUR: 1,
        USD: 1.08, // ejemplo: 1€ = 1.08$
        YEN: 144   // ejemplo: 1€ = 144¥
    };

    // Símbolos para cada moneda
    const simbolos = {
        EUR: "€",
        USD: "$",
        YEN: "¥"
    };

    if (lista.length === 0) {
        contenedor.innerHTML = isEn ? "<p>No destinations found.</p>" : "<p>No se encontraron destinos.</p>";
        return;
    }

    lista.forEach(ciudad => {
        const clone = plantilla.content.cloneNode(true);

        clone.querySelector(".imagen-destino").src = ciudad.image.url;
        clone.querySelector(".imagen-destino").alt = ciudad.image.alt;

        if (isEn && ciudad.name_en) {
            clone.querySelector(".nombre-destino").textContent = ciudad.name_en;
        } else {
            clone.querySelector(".nombre-destino").textContent = ciudad.name;
        }

        // Convertimos el precio según la moneda
        const precioConvertido = (ciudad.precio * conversion[moneda]).toFixed(0);
        clone.querySelector(".precio-destino").textContent = `${precioConvertido}${simbolos[moneda]}`;

        clone.querySelector(".tarjeta-destino").addEventListener("click", () => {
            const nombre = ciudad.name.split(",")[0].trim();
            localStorage.setItem("destinoSeleccionado", nombre);
            window.location.href = "ComprarProducto.html";
        });

        contenedor.appendChild(clone);
    });
}


async function cargarCiudades() {
    try {
        const res = await fetch("../ciudades-del-mundo.json");
        const data = await res.json();

        data.continents.forEach(cont => {
            cont.countries.forEach(pais => {
                pais.cities.forEach(ciudad => {
                    todasLasCiudades.push({
                        name: ciudad.name,
                        name_en: ciudad.name_en,
                        description: ciudad.description,
                        description_en: ciudad.description_en,
                        image: ciudad.image,
                        transportes: ciudad.transportes,
                        precio: ciudad.precio,
                        pais: pais.name,
                        pais_en: pais.name_en,
                        continente: cont.name
                    });
                });
            });
        });
    } catch (err) {
        console.error("Error cargando JSON:", err);
    }
}
