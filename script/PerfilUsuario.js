// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarToggles();
    cargarEstadoToggles();
});

// Mandamos una aletra si pinchan en un enlace que no estan implementados
document.addEventListener("DOMContentLoaded", () => {
    const enlacesNoImplementados = document.querySelectorAll('a[href="#"]');

    enlacesNoImplementados.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Esta opción no está implementada");
        });
    });

    const usuario_actual = localStorage.getItem("currentUser");
    if (usuario_actual) {
        const perfilNombre = document.getElementById("perfil-nombre-usuario");
        const fotoPerfil = document.querySelector(".usuario-avatar");

        // Cargamos el nombre de usuario
        perfilNombre.textContent = usuario_actual;
        // Cargamos la foto de perfil si existe
        const datosUsuario = JSON.parse(localStorage.getItem("user_" + usuario_actual));
        if (datosUsuario && datosUsuario.foto) {
            fotoPerfil.src = datosUsuario.foto;
        }
    }   
});


// Función para inicializar los toggles
function inicializarToggles() {
    // Toggle de daltonismo
    const toggleDaltonismo = document.getElementById('toggle-daltonismo');
    if (toggleDaltonismo) {
        toggleDaltonismo.addEventListener('click', function() {
            this.classList.toggle('active');
            const activado = this.classList.contains('active');
            
            // Usar la función global para actualizar el tema
            window.actualizarTema('daltonico', activado);
        });
    }
    
    // Toggle de modo oscuro
    const toggleModoOscuro = document.getElementById('toggle-modo-oscuro');
    if (toggleModoOscuro) {
        toggleModoOscuro.addEventListener('click', function() {
            this.classList.toggle('active');
            const activado = this.classList.contains('active');
            
            // Usar la función global para actualizar el tema
            window.actualizarTema('oscuro', activado);
        });
    }
}

// Función para cargar el estado guardado de los toggles
function cargarEstadoToggles() {
    // Cargar estado de daltonismo
    const modoDaltonico = localStorage.getItem('modo-daltonico');
    const toggleDaltonismo = document.getElementById('toggle-daltonismo');
    
    if (modoDaltonico === 'true' && toggleDaltonismo) {
        toggleDaltonismo.classList.add('active');
    }
    
    // Cargar estado de modo oscuro
    const modoOscuro = localStorage.getItem('modo-oscuro');
    const toggleModoOscuro = document.getElementById('toggle-modo-oscuro');
    
    if (modoOscuro === 'true' && toggleModoOscuro) {
        toggleModoOscuro.classList.add('active');
    }
}

// Función para cerrar sesión
document.addEventListener('DOMContentLoaded', function() {
    const btnCerrarSesion = document.querySelector('.btn-cerrar-sesion');
    
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                window.location.href = 'Home.html';
            }
        });
    }
});