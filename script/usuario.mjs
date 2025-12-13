// usuario.mjs

// Muestra la información básica del usuario (nombre y foto) en un contenedor.
export function mostrarPerfilUsuario(usuario) {
    // Contenedor donde se mostrará el perfil
    const contenido = document.querySelector('.grupo-botones');

    // Obtenemos los datos del usuario desde localStorage
    const datos_usuario = localStorage.getItem('user_' + usuario);
    const foto = JSON.parse(datos_usuario).foto;

    // Insertamos la estructura HTML con foto y nombre
    contenido.innerHTML = `
        <div class="perfil-usuario">
            <img class="foto-usuario" src="${foto}" alt="${usuario}">
            <h2 class="nombre-usuario">${usuario}</h2>
        </div>
    `;
}

// Carga la información del usuario actual logueado
export function cargarUsuarioPerfil() {
    const usuarioActual = localStorage.getItem("currentUser");
    if (!usuarioActual) return; // Si no hay usuario logueado, salir

    const perfilNombre = document.getElementById("perfil-nombre-usuario");
    const fotoPerfil = document.querySelector(".usuario-avatar");

    if (perfilNombre) {
        perfilNombre.textContent = usuarioActual;
    }

    // Obtenemos los datos completos del usuario desde localStorage
    const datosUsuario = JSON.parse( localStorage.getItem("user_" + usuarioActual));

    // Si hay foto, la actualizamos
    if (fotoPerfil && datosUsuario?.foto) {
        fotoPerfil.src = datosUsuario.foto;
    }
}

// Configura el botón de cerrar sesión.
export function inicializarCerrarSesion() {
    const btnCerrarSesion = document.querySelector(".btn-cerrar-sesion");
    if (!btnCerrarSesion) return;

    btnCerrarSesion.addEventListener("click", () => {
        const currentUser = localStorage.getItem("currentUser");
        let mensaje = "¿Estás seguro de que quieres cerrar sesión?";

         // Si el usuario está logueado, personalizamos el mensaje con su nombre
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

        // Confirmación y cierre de sesión
        if (confirm(mensaje)) {
            localStorage.removeItem("currentUser");
            window.location.replace("Home.html");
        }
    });
}

