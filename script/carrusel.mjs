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
        // Primero nos aseguramos de que el índice sea válido:
        if (n < 0) index = total - 2;   // Si pasamos antes de la primera, vamos al último
        else if (n >= total-1) index = 0; // Si pasamos del último, volvemos al primero
        else index = n;                  // Si está dentro del rango, usamos ese índice

        const item = packs[0]; // Tomamos el primer item para medir su ancho dinámicamente

        // Obtenemos el gap real que tiene el track en píxeles
        const trackStyle = window.getComputedStyle(track);
        const gap = parseFloat(trackStyle.gap);

        // Calculamos cuánto tenemos que desplazar el track
        // Ancho del item + gap entre items
        const offset = -(index * (item.offsetWidth + gap));

        // Movemos el track usando translateX
        // Usamos px, así se adapta perfectamente al responsive y al gap real
        track.style.transform = `translateX(${offset}px)`;
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

    //AUTOPLAY cada 4 segundos
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
