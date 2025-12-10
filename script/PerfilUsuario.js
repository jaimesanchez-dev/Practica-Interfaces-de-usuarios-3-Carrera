// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarToggles();
    cargarEstadoToggles();
});

// Función para inicializar los toggles
function inicializarToggles() {
    // Toggle de daltonismo
    const toggleDaltonismo = document.getElementById('toggle-daltonismo');
    if (toggleDaltonismo) {
        toggleDaltonismo.addEventListener('click', function() {
            this.classList.toggle('active');
            const activado = this.classList.contains('active');
            localStorage.setItem('modo-daltonico', activado);
            
            // Aplicar o quitar la clase del body
            if (activado) {
                document.body.classList.add('modo-daltonico');
            } else {
                document.body.classList.remove('modo-daltonico');
            }
        });
    }
    
    // Toggle de modo oscuro
    const toggleModoOscuro = document.getElementById('toggle-modo-oscuro');
    if (toggleModoOscuro) {
        toggleModoOscuro.addEventListener('click', function() {
            this.classList.toggle('active');
            const activado = this.classList.contains('active');
            localStorage.setItem('modo-oscuro', activado);
            
            // Aplicar o quitar la clase del body
            if (activado) {
                document.body.classList.add('modo-oscuro');
                console.log('Modo oscuro activado');
            } else {
                document.body.classList.remove('modo-oscuro');
                console.log('Modo oscuro desactivado');
            }
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
        document.body.classList.add('modo-daltonico');
    }
    
    // Cargar estado de modo oscuro
    const modoOscuro = localStorage.getItem('modo-oscuro');
    const toggleModoOscuro = document.getElementById('toggle-modo-oscuro');
    
    if (modoOscuro === 'true' && toggleModoOscuro) {
        toggleModoOscuro.classList.add('active');
        document.body.classList.add('modo-oscuro');
    }
}

// Función para cerrar sesión (opcional)
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