// MisReseñas.js

import { encontrarCiudad } from './destinos.mjs';
import { actualizarEstrellas } from './botones_interactivos.mjs';
import { mostrarReseña } from './usuario.mjs';
import { cargar_idioma, aplicarIdioma } from './idioma.mjs';

document.addEventListener("DOMContentLoaded", async () => {

    cargar_idioma();
    const selector = document.querySelector(".header-idioma");
    if (selector) {
        selector.addEventListener("change", () => {
            const idioma = selector.value;
            localStorage.setItem("idioma", idioma);
            aplicarIdioma(idioma);
            renderizarMisReseñas(); // Re-renderizar
        });
    }

    const contenedor = document.getElementById("reseñaContenedor");
    const plantilla = document.getElementById("plantillaReseña");
    const currentUser = localStorage.getItem("currentUser");

    // Función para renderizar las reseñas (encapsulada para poder llamarla al cambiar idioma)
    async function renderizarMisReseñas() {
        contenedor.innerHTML = ""; // Limpiar
        // Obtenemos los destinos comprados por el usuario
        const destinosComprados = JSON.parse(localStorage.getItem("compras_" + currentUser)) || [];

        if (destinosComprados.length === 0) {
            const idioma = localStorage.getItem("idioma") || "es";
            contenedor.innerHTML += idioma === "en" ? "<p>You haven't bought any destinations yet.</p>" : "<p>No has comprado ningún destino todavía.</p>";
            return;
        }

        // Obtenemos las reseñas del usuario
        let reseñasUsuario = JSON.parse(localStorage.getItem("reseñas_" + currentUser)) || [];

        // Recorreremos los destinos comprados
        for (const destino of destinosComprados) {

            const datosCiudad = await encontrarCiudad(destino);
            if (!datosCiudad) continue;

            // Clonamos la plantilla del destino
            const clone = plantilla.content.cloneNode(true);

            // Rellenamos los datos del destino
            clone.querySelector(".imagen-destino").src = datosCiudad.imagen.url;
            clone.querySelector(".imagen-destino").alt = datosCiudad.imagen.alt;
            clone.querySelector(".nombre-destino").textContent = `${datosCiudad.nombre} , ${datosCiudad.pais}`;
            clone.querySelector(".descripcion-destino").textContent = datosCiudad.descripcion;

            const form = clone.querySelector(".inputs-reseñas");
            const estrellasContenedor = clone.querySelector(".estrellas");

            let estrellasValor = 0;

            form.dataset.destino = destino;

            // Miramos si el usuario ya tiene una reseña para este destino y la mostramos
            let reseñaExistente = reseñasUsuario.find(r => r.destino === destino);
            if (reseñaExistente) {
                estrellasValor = reseñaExistente.estrellas;
                actualizarEstrellas(estrellasContenedor, estrellasValor);
                // Mostramos la reseña 
                mostrarReseña(
                    form,
                    reseñaExistente.titulo,
                    reseñaExistente.descripcion,
                    estrellasValor
                );

                // Ocultamos el formulario
                form.style.display = "none";
                estrellasContenedor.style.display = "none";
            }


            // Si se hace click en alguna estrella, actualizamos el valor
            const botones = estrellasContenedor.querySelectorAll(".btn-estrella");
            botones.forEach(boton => {
                boton.addEventListener("click", () => {
                    estrellasValor = parseInt(boton.dataset.pos);
                    actualizarEstrellas(estrellasContenedor, estrellasValor);
                });
            });


            // Si se envía el formulario, guardamos la reseña
            form.addEventListener("submit", (e) => {
                e.preventDefault(); // Evitamos el envío del formulario para que no se recarge la página

                const titulo = form.querySelector("input[name='titulo_resena']").value.trim();
                const descripcion = form.querySelector("input[name='descr_resena']").value.trim();

                if (!titulo || !descripcion || estrellasValor === 0) {
                    return alert("Rellena todos los campos.");
                }

                // Guardamos las reseñas del usuario
                reseñasUsuario = reseñasUsuario.filter(r => r.destino !== destino);
                reseñasUsuario.push({ destino, titulo, descripcion, estrellas: estrellasValor });
                localStorage.setItem("reseñas_" + currentUser, JSON.stringify(reseñasUsuario));

                // Actualizamos las últimas reseñas
                let ultimas = JSON.parse(localStorage.getItem("ultimas_reseñas")) || {};
                if (!ultimas[destino]) ultimas[destino] = [];

                ultimas[destino] = ultimas[destino].filter(r => r.usuario !== currentUser);

                ultimas[destino].push({
                    usuario: currentUser,
                    titulo,
                    descripcion,
                    estrellas: estrellasValor,
                    imagen: JSON.parse(localStorage.getItem('user_' + currentUser)).foto
                });

                // Máximo, mostramos 3 reseñas de cada destino, las 3 más recientes
                ultimas[destino] = ultimas[destino].slice(-3);

                localStorage.setItem("ultimas_reseñas", JSON.stringify(ultimas));

                // Mostramos la reseña publicada
                mostrarReseña(form, titulo, descripcion, estrellasValor);

                // Y ocultamos el formulario
                form.style.display = "none";
                estrellasContenedor.style.display = "none";
            });

            contenedor.appendChild(clone);
        }
    }

    renderizarMisReseñas();
});
