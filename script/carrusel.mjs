// carrusel.mjs

export function iniciarCarrusel() {
    const track = document.querySelector('.carrusel-track');
    const packs = document.querySelectorAll('.carrusel-item');
    const boton_izquierda = document.querySelector('.flecha-izquierda');
    const boton_derecha = document.querySelector('.flecha-derecha');

    let index = 0;
    const total = packs.length;
    let autoPlayInterval = null; // para guardar el intervalo

    // Función para mostrar una diapositiva específica
    function showSlide(n) {
        if (n < 0) index = total - 2;     // última posición válida (para que no se vea la ultima foto con hueco blanco a la derecha)
        else if (n >= total-1) index = 0;
        else index = n;

        const offset = -(index * 50 + index * 2); // multiplico por 2 porque el gap entre las imagenes es 2%
        track.style.transform = `translateX(${offset}%)`;
    }
    // Funciones de navegación manual
    function siguienteSlide() {
        showSlide(index + 1);
    }
    function anteriorSlide() {
        showSlide(index - 1);
    }
    // Escuchadores de las flechas
    boton_izquierda.addEventListener("click", () => {
        anteriorSlide();
        reiniciarAutoPlay();
    });
    boton_derecha.addEventListener("click", () => {
        siguienteSlide();
        reiniciarAutoPlay();
    });

    // --- AUTOPLAY cada 2 segundos ---
    function iniciarAutoPlay() {
        detenerAutoPlay(); 
        autoPlayInterval = setInterval(siguienteSlide, 4000); //4 segundos
    }
    function detenerAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }
    function reiniciarAutoPlay() {
        detenerAutoPlay();
        iniciarAutoPlay();
    }
    // Inicia el carrusel en el primer pack
    showSlide(index);

    // Activa el autoplay al cargar
    iniciarAutoPlay();
}
