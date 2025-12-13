// reseñas.mjs

import { encontrarCiudad } from './destinos.mjs';
import { actualizarEstrellas } from './botonesInteractivos.mjs';

// Oculta el formulario original y genera un div con la reseña publicada
function mostrarReseña(form, titulo, descripcion, estrellas) {

    // Ocultar formulario y estrellas
    form.style.display = "none";
    const contenedorEstrellas = form.closest(".reseña-viaje").querySelector(".estrellas");
    contenedorEstrellas.style.display = "none";

    const destino = form.dataset.destino; // destino al que pertenece la reseña
    const currentUser = localStorage.getItem("currentUser"); // usuario logueado

    const div = document.createElement("div");
    div.classList.add("reseña-publicada");

    // Pintamos las estrellas en HTML según el valor
    let estrellasHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= estrellas) {
            estrellasHTML += `<img src="images/estrella-rellena.png" class="estrella">`;
        } else {
            estrellasHTML += `<img src="images/estrella-vacia.png" class="estrella">`;
        }
    }

    // Creamos la estructura de la reseña
    div.innerHTML = `
        <img class="foto-usuario-reseña" src="${JSON.parse(localStorage.getItem("user_" + currentUser)).foto}" alt="${currentUser}">
        <div>
            <div class="estrellas">${estrellasHTML}</div>
            <h3>${titulo}</h3>
            <p>${descripcion}</p>
            <button class="btn-borrar">Eliminar</button>
        </div>
    `;

    // Evento para borrar la reseña si pulsas el boton de Borrar
    div.querySelector(".btn-borrar").addEventListener("click", () => {

        // Borramos la reseña asociada al usuario (la reseña que hemos creado)
        let reseñasUsuario = JSON.parse(localStorage.getItem("reseñas_" + currentUser)) || [];
        reseñasUsuario = reseñasUsuario.filter(r => r.destino !== destino);
        localStorage.setItem("reseñas_" + currentUser, JSON.stringify(reseñasUsuario));

        // Borraramos la reseña si forma parte de las ultimas reseñas
        let ultimas = JSON.parse(localStorage.getItem("ultimas_reseñas")) || {};

        if (ultimas[destino]) {
            ultimas[destino] = ultimas[destino].filter(r => r.usuario !== currentUser);
            localStorage.setItem("ultimas_reseñas", JSON.stringify(ultimas));
        }

        // Al darle al boton de borrar, volvemos a mostrar el formulario
        div.remove();
        form.style.display = "flex";
        contenedorEstrellas.style.display = "flex";
    });

    form.parentNode.appendChild(div);
}


// Renderiza todas las reseñas del usuario para los destinos comprados
export async function renderizarMisReseñas({ contenedor, plantilla, currentUser }) {
    contenedor.innerHTML = "";

    // Obtenemos destinos comprados
    const destinosComprados =
        JSON.parse(localStorage.getItem("compras_" + currentUser)) || [];

    // Mensaje si no ha comprado nada
    if (destinosComprados.length === 0) {
        const idioma = localStorage.getItem("idioma") || "es";
        contenedor.innerHTML =
            idioma === "en"
                ? "<p>You haven't bought any destinations yet.</p>"
                : "<p>No has comprado ningún destino todavía.</p>";
        return;
    }
    // Obtenemos reseñas del usuario
    let reseñasUsuario = JSON.parse(localStorage.getItem("reseñas_" + currentUser)) || [];

    for (const destino of destinosComprados) {
        const datosCiudad = await encontrarCiudad(destino);
        if (!datosCiudad) continue;

        // Clonamos plantilla HTML para cada destino
        const clone = plantilla.content.cloneNode(true);

        clone.querySelector(".imagen-destino").src = datosCiudad.imagen.url;
        clone.querySelector(".imagen-destino").alt = datosCiudad.imagen.alt;
        clone.querySelector(".nombre-destino").textContent = `${datosCiudad.nombre} , ${datosCiudad.pais}`;
        clone.querySelector(".descripcion-destino").textContent = datosCiudad.descripcion;

        const form = clone.querySelector(".inputs-reseñas");
        const estrellasContenedor = clone.querySelector(".estrellas");
        let estrellasValor = 0;

        form.dataset.destino = destino; // asociamos el formulario al destino
        
        // Si ya existe una reseña para este destino
        const reseñaExistente = reseñasUsuario.find(r => r.destino === destino);

        if (reseñaExistente) {
            estrellasValor = reseñaExistente.estrellas;
            actualizarEstrellas(estrellasContenedor, estrellasValor);

            mostrarReseña(
                form,
                reseñaExistente.titulo,
                reseñaExistente.descripcion,
                estrellasValor
            );

            form.style.display = "none";
            estrellasContenedor.style.display = "none";
        }

        estrellasContenedor
            .querySelectorAll(".btn-estrella")
            .forEach(boton => {
                boton.addEventListener("click", () => {
                    estrellasValor = parseInt(boton.dataset.pos); // actualizamos valor
                    actualizarEstrellas(estrellasContenedor, estrellasValor); // actualizamos visual
                });
            });

        form.addEventListener("submit", e => {
            e.preventDefault();

            const titulo =
                form.querySelector("input[name='titulo_resena']").value.trim();
            const descripcion =
                form.querySelector("input[name='descr_resena']").value.trim();

            if (!titulo || !descripcion || estrellasValor === 0) {
                return alert("Rellena todos los campos.");
            }

            // Guardamos la reseña del usuario
            reseñasUsuario = reseñasUsuario.filter(r => r.destino !== destino);

            reseñasUsuario.push({destino, titulo, descripcion, estrellas: estrellasValor});

            localStorage.setItem( "reseñas_" + currentUser, JSON.stringify(reseñasUsuario));

            // Guardamos las últimas reseñas por destino (máx. 3)
            let ultimas = JSON.parse(localStorage.getItem("ultimas_reseñas")) || {};
            if (!ultimas[destino]) ultimas[destino] = [];
            ultimas[destino] = ultimas[destino].filter(r => r.usuario !== currentUser);

            ultimas[destino].push({
                usuario: currentUser,
                titulo,
                descripcion,
                estrellas: estrellasValor,
                imagen: JSON.parse(
                    localStorage.getItem("user_" + currentUser)
                ).foto
            });

            ultimas[destino] = ultimas[destino].slice(-3);

            localStorage.setItem( "ultimas_reseñas", JSON.stringify(ultimas) );

            // Mostramos la reseña publicada
            mostrarReseña(form, titulo, descripcion, estrellasValor);
            form.style.display = "none";
            estrellasContenedor.style.display = "none";
        });

        contenedor.appendChild(clone);
    }
}