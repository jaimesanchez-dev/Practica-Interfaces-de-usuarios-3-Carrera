// usuario.mjs

export function mostrarPerfilUsuario(usuario) {
    const contenido = document.querySelector('.grupo-botones');
    const datos_usuario = localStorage.getItem('user_' + usuario);
    const foto = JSON.parse(datos_usuario).foto;

    // inner borra todo lo que estaba dentro del div y pone lo de debajo
    contenido.innerHTML = `
        <div class="perfil-usuario">
            <img class="foto-usuario" src="${foto}" alt="${usuario.nombre}">
            <h2 class="nombre-usuario">${usuario}</h1>
        </div>
    `;
}


export function mostrarReseña(form, titulo, descripcion, estrellas) {
    // Ocultamos inputs
    form.style.display = "none";
    // Buscamos las estrellas dentro del bloque de la reseña
    const contenedor_estrellas = form.closest(".reseña-viaje").querySelector(".estrellas");
    // Ocultamos las estrellas
    contenedor_estrellas.style.display = "none";

    const contenedor = document.createElement("div");
    contenedor.classList.add("reseña-publicada");

    let estrellasHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= estrellas) {
            estrellasHTML += `<img src="images/estrella-rellena.png" alt="estrella" class="estrella">`;
        } else {
            estrellasHTML += `<img src="images/estrella-vacia.png" alt="estrella" class="estrella">`;
        }
    }

    // Usamos innerHTML para crear el contenido
    contenedor.innerHTML = `
        <div class="estrellas">${estrellasHTML}</div>
        <h3>${titulo}</h3>
        <p>${descripcion}</p>
        <button class="btn-borrar">Eliminar</button>
    `;

    const btnBorrar = contenedor.querySelector(".btn-borrar");
    btnBorrar.addEventListener("click", () => {
        contenedor.remove();
        form.style.display = "flex"; // Vuelve a mostrar el formulario
        contenedor_estrellas.style.display = "flex"; // Vuelve a mostrar las estrellas
    });

    form.parentNode.appendChild(contenedor);
}