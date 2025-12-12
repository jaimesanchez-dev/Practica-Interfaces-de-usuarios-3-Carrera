// usuario.mjs

export function mostrarPerfilUsuario(usuario) {
    const contenido = document.querySelector('.grupo-botones');
    const datos_usuario = localStorage.getItem('user_' + usuario);
    const foto = JSON.parse(datos_usuario).foto;

    contenido.innerHTML = `
        <div class="perfil-usuario">
            <img class="foto-usuario" src="${foto}" alt="${usuario}">
            <h2 class="nombre-usuario">${usuario}</h2>
        </div>
    `;
}


export function mostrarReseña(form, titulo, descripcion, estrellas) {

    // Ocultar formulario y estrellas
    form.style.display = "none";
    const contenedorEstrellas = form.closest(".reseña-viaje").querySelector(".estrellas");
    contenedorEstrellas.style.display = "none";

    const destino = form.dataset.destino;
    const currentUser = localStorage.getItem("currentUser");

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
