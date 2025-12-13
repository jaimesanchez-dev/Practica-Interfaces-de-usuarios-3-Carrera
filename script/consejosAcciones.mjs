// consejosAcciones.mjs

// Consejos por defecto que se cargarán la primera vez
export const consejosPorDefecto = [
    { titulo: "¡Es importante beber mucha agua si vas a visitar una ciudad!", 
        descripcion: "Mantenerte hidratado es fundamental, especialmente cuando caminas mucho explorando nuevos lugares." 
    },
    { titulo: "Recuerda siempre llevar tiritas por si te haces daño en un pie", 
        descripcion: "Las ampollas pueden arruinar tu viaje. Lleva siempre tiritas en tu mochila para prevenir molestias." 
    },
    { titulo: "Si te sientes agobiado, deja todo lo que estés haciendo y mira el cielo", 
        descripcion: "Tómate un momento para respirar y disfrutar del presente. El cielo siempre te recordará lo grande que es el mundo." 
    },
    { titulo: "Lleva siempre un calzado cómodo para que puedas disfrutar mejor de la experiencia", 
        descripcion: "Unas buenas zapatillas harán que disfrutes más de tus caminatas y exploraciones sin dolor de pies." 
    }
];

// Función para manejar los acordeones
function initAccordions() {
    const acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
        // Remover listeners anteriores clonando el elemento
        const nuevoAcc = acc[i].cloneNode(true);
        acc[i].parentNode.replaceChild(nuevoAcc, acc[i]);
    }

    // Ahora añadir los listeners a los elementos actualizados
    const accActualizado = document.getElementsByClassName("accordion");
    for (let i = 0; i < accActualizado.length; i++) {
        accActualizado[i].addEventListener("click", function() {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;

        // Abrir o cerrar el panel
        if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        } 
        });
    }
}

// Función para cargar los consejos
function cargarConsejos() {
    let consejosGuardados = localStorage.getItem('consejos');

    // Si no hay consejos guardados, se cargan los por defecto
    if (!consejosGuardados || consejosGuardados === '[]') {
        localStorage.setItem('consejos', JSON.stringify(consejosPorDefecto));
        consejosGuardados = JSON.stringify(consejosPorDefecto);
    }

    return JSON.parse(consejosGuardados);
}

// Función para mostrar consejos en la página
export function mostrarConsejos() {
    const consejos = cargarConsejos();
    const main = document.querySelector('.flex-main');
    const primerH1 = main.querySelector('h1');

    // Limpiar consejos existentes
    main.querySelectorAll('.accordion, .panel').forEach(el => el.remove());

    // Insertar consejos en orden inverso (el primero arriba)
    for (let i = consejos.length - 1; i >= 0; i--) {
        const { titulo, descripcion } = consejos[i];

        const nuevoAccordion = document.createElement('button');
        nuevoAccordion.className = 'accordion';
        nuevoAccordion.textContent = titulo;

        const nuevoPanel = document.createElement('div');
        nuevoPanel.className = 'panel';
        const parrafo = document.createElement('p');
        parrafo.textContent = descripcion;
        nuevoPanel.appendChild(parrafo);

        primerH1.after(nuevoPanel);
        primerH1.after(nuevoAccordion);
    }
    // Inicializar acordeones después de cargarlos
    initAccordions();
}

// Función para guardar consejos en localStorage
function guardarConsejos() {
    const main = document.querySelector('.flex-main');
    const todosLosAccordions = main.querySelectorAll('.accordion');
    const consejos = [];

    // Obtener todos los consejos actuales
    todosLosAccordions.forEach(accordion => {
        const panel = accordion.nextElementSibling;
        consejos.push({
        titulo: accordion.textContent,
        descripcion: panel.querySelector('p').textContent
        });
    });

    // Mantener solo los últimos 4 consejos
    if (consejos.length > 4) consejos.splice(4);

    localStorage.setItem('consejos', JSON.stringify(consejos));
}

// Función para agregar un nuevo consejo
function agregarConsejo(titulo, descripcion) {
    const main = document.querySelector('.flex-main');
    // Obtener el primer h1 (donde dice "Consejos de la comunidad:")
    const primerH1 = main.querySelector('h1');

    // Crear el botón del acordeón
    const nuevoAccordion = document.createElement('button');
    nuevoAccordion.className = 'accordion';
    nuevoAccordion.textContent = titulo;

    // Crear el panel con la descripción
    const nuevoPanel = document.createElement('div');
    nuevoPanel.className = 'panel';
    const parrafo = document.createElement('p');
    parrafo.textContent = descripcion;
    nuevoPanel.appendChild(parrafo);

    // Insertar el nuevo consejo después del h1
    primerH1.after(nuevoPanel);
    primerH1.after(nuevoAccordion);

    // Eliminar último consejo si hay más de 4
    const todosLosAccordions = document.querySelectorAll('.accordion');
    if (todosLosAccordions.length > 4) {
        const ultimoAccordion = todosLosAccordions[todosLosAccordions.length - 1];
        const ultimoPanel = ultimoAccordion.nextElementSibling;
        ultimoAccordion.remove();
        ultimoPanel.remove();
    }
    
    // Guardar en localStorage
    guardarConsejos();
    
    // Reinicializar los event listeners de los acordeones
    initAccordions();
}

// Función para enviar el consejo
export function enviarConsejo(inputTitulo, inputDescripcion) {
    const titulo = inputTitulo.value.trim();
    const descripcion = inputDescripcion.value.trim();

    // Validar que ambos campos tengan contenido
    if (!titulo || !descripcion) {
        alert('Por favor, completa tanto el título como la descripción del consejo.');
        return;
    }

    agregarConsejo(titulo, descripcion);

    // Limpiar inputs
    inputTitulo.value = '';
    inputDescripcion.value = '';
}
