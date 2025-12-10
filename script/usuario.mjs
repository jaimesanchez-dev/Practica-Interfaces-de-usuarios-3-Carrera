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