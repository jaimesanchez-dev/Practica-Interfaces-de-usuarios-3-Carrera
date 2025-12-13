// temaGlobal.js
// Aplica los temas guardados en todas las páginas

// Función que se ejecuta inmediatamente al cargar la página
(function() {
    // Cargar estado de daltonismo
    const modoDaltonico = localStorage.getItem('modo-daltonico');
    if (modoDaltonico === 'true') {
        document.body.classList.add('modo-daltonico');
    }
    
    // Cargar estado de modo oscuro
    const modoOscuro = localStorage.getItem('modo-oscuro');
    if (modoOscuro === 'true') {
        document.body.classList.add('modo-oscuro');
    }
})();

// Función para actualizar el tema (útil si añades toggles en otras páginas)
function actualizarTema(tipo, activado) {
    if (tipo === 'daltonico') {
        localStorage.setItem('modo-daltonico', activado);
        if (activado) {
            document.body.classList.add('modo-daltonico');
        } else {
            document.body.classList.remove('modo-daltonico');
        }
    } else if (tipo === 'oscuro') {
        localStorage.setItem('modo-oscuro', activado);
        if (activado) {
            document.body.classList.add('modo-oscuro');
        } else {
            document.body.classList.remove('modo-oscuro');
        }
    }
}

// Exportar la función para usarla en otros scripts
window.actualizarTema = actualizarTema;