import { encontrarCiudad } from './destinos.mjs';
import { actualizarEstrellas } from './botones_interactivos.mjs';
import { mostrarReseña } from './usuario.mjs';

document.addEventListener("DOMContentLoaded", async () => {

    const contenedor =  document.getElementById("reseñaContenedor");
    const plantilla = document.getElementById("plantillaReseña");
    const currentUser = localStorage.getItem("currentUser");

    // Obtenemos los destinos comprados del usuario
    const destinosComprados = JSON.parse(localStorage.getItem("compras_" + currentUser)) || [];

    if (destinosComprados.length === 0) {
        contenedor.innerHTML += "<p>No has comprado ningún destino todavía.</p>";
        return;
    }

    // Cargamos las reseñas del usuario (si las hay)
    let reseñasUsuario = JSON.parse(localStorage.getItem("reseñas_" + currentUser)) || [];

    for (const destino of destinosComprados) {
        // Obtenemos los datos de la ciudad
        const datosCiudad = await encontrarCiudad(destino);
        if (!datosCiudad) continue;

        const clone = plantilla.content.cloneNode(true);
        clone.querySelector(".imagen-destino").src = datosCiudad.imagen.url;
        clone.querySelector(".imagen-destino").alt = datosCiudad.imagen.alt;
        clone.querySelector(".nombre-destino").textContent = `${datosCiudad.nombre} , ${datosCiudad.pais}`;
        clone.querySelector(".descripcion-destino").textContent = datosCiudad.descripcion;

        const form = clone.querySelector(".inputs-reseñas");
        const estrellasContenedor = clone.querySelector(".estrellas");
        let estrellasValor = 0;

        // Comprobamos si el usuario ya a hecho una reseña para este destino
        const reseñaExistente = reseñasUsuario.find(r => r.destino === destino);
        if (reseñaExistente) {
            estrellasValor = reseñaExistente.estrellas || 0;
            actualizarEstrellas(estrellasContenedor, estrellasValor);
            mostrarReseña(form, reseñaExistente.titulo, reseñaExistente.descripcion, estrellasValor);
        }

        // Eventos para estrellas
        const botones = estrellasContenedor.querySelectorAll(".btn-estrella");
        botones.forEach(boton => {
            boton.addEventListener("click", () => {
                estrellasValor = parseInt(boton.dataset.pos); // parseInt convierte el string a número
                actualizarEstrellas(estrellasContenedor, estrellasValor);
            });
        });

        // Evento para enviar reseña
        form.addEventListener("submit", (evento) => {
            evento.preventDefault(); // Evitamos que se recarge la página al enviar el formulario

            const titulo = form.querySelector("input[name='titulo_resena']").value.trim();
            const descripcion = form.querySelector("input[name='descr_resena']").value.trim();

            // Validamos que ambos campos estén rellenos
            if (!titulo || !descripcion || estrellasValor === 0){
                return alert("Rellena ambos campos.");
            } 

            // Guardamos la reseña del usuario
            reseñasUsuario = reseñasUsuario.filter(r => r.destino !== destino);
            reseñasUsuario.push({ destino, titulo, descripcion, estrellas: estrellasValor });
            localStorage.setItem("reseñas_" + currentUser, JSON.stringify(reseñasUsuario));

            // Obtenemos las reseñas guardadas o iniciamos un objeto vacío
            let ultimasReseñasPorDestino = JSON.parse(localStorage.getItem("ultimas_reseñas")) || {};
            // Si no existe todavía un array para este destino, creamos uno
            if (!ultimasReseñasPorDestino[destino]) {
                ultimasReseñasPorDestino[destino] = [];
            }
            // Añadimos la nueva reseña
            ultimasReseñasPorDestino[destino].push({ usuario: currentUser, titulo, descripcion, estrellas: estrellasValor });

            // Nos aseguramos de guardar solo las últimas 3 reseñas de este destino
            if (ultimasReseñasPorDestino[destino].length > 3) {
                ultimasReseñasPorDestino[destino] = ultimasReseñasPorDestino[destino].slice(-3);
            }
            // Guardamos de nuevo en localStorage
            localStorage.setItem("ultimas_reseñas", JSON.stringify(ultimasReseñasPorDestino));
            
            mostrarReseña(form, titulo, descripcion, estrellasValor);
        });

        contenedor.appendChild(clone);
    }
});
