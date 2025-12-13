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

export function cargarUsuarioPerfil() {
    const usuarioActual = localStorage.getItem("currentUser");
    if (!usuarioActual) return;

    const perfilNombre = document.getElementById("perfil-nombre-usuario");
    const fotoPerfil = document.querySelector(".usuario-avatar");

    if (perfilNombre) {
        perfilNombre.textContent = usuarioActual;
    }

    const datosUsuario = JSON.parse(
        localStorage.getItem("user_" + usuarioActual)
    );

    if (fotoPerfil && datosUsuario?.foto) {
        fotoPerfil.src = datosUsuario.foto;
    }
}

export function inicializarCerrarSesion() {
    const btnCerrarSesion = document.querySelector(".btn-cerrar-sesion");
    if (!btnCerrarSesion) return;

    btnCerrarSesion.addEventListener("click", () => {
        const currentUser = localStorage.getItem("currentUser");
        let mensaje = "¿Estás seguro de que quieres cerrar sesión?";

        if (currentUser) {
            const userData = JSON.parse(
                localStorage.getItem("user_" + currentUser)
            );
            if (userData?.nombre) {
                mensaje = `¿Seguro que quieres cerrar sesión, ${userData.nombre}?`;
            } else {
                mensaje = "¿Seguro que quieres cerrar sesión?";
            }
        }

        if (confirm(mensaje)) {
            localStorage.removeItem("currentUser");
            window.location.href = "Home.html";
        }
    });
}

