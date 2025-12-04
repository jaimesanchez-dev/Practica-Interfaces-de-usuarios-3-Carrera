// Consejos por defecto que se cargarán la primera vez
const consejosPorDefecto = [
  { 
    titulo: "¡Es importante beber mucha agua si vas a visitar una ciudad!", 
    descripcion: "Mantenerte hidratado es fundamental, especialmente cuando caminas mucho explorando nuevos lugares." 
  },
  { 
    titulo: "Recuerda siempre llevar tiritas por si te haces daño en un pie", 
    descripcion: "Las ampollas pueden arruinar tu viaje. Lleva siempre tiritas en tu mochila para prevenir molestias." 
  },
  { 
    titulo: "Si te sientes agobiado, deja todo lo que estés haciendo y mira el cielo", 
    descripcion: "Tómate un momento para respirar y disfrutar del presente. El cielo siempre te recordará lo grande que es el mundo." 
  },
  { 
    titulo: "Lleva siempre un calzado cómodo para que puedas disfrutar mejor de la experiencia", 
    descripcion: "Unas buenas zapatillas harán que disfrutes más de tus caminatas y exploraciones sin dolor de pies." 
  }
];

// Función para manejar los acordeones
function initAccordions() {
  var acc = document.getElementsByClassName("accordion");
  
  for (let i = 0; i < acc.length; i++) {
    // Remover listeners anteriores clonando el elemento
    let nuevoAcc = acc[i].cloneNode(true);
    acc[i].parentNode.replaceChild(nuevoAcc, acc[i]);
  }
  
  // Ahora añadir los listeners a los elementos actualizados
  acc = document.getElementsByClassName("accordion");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }
}

// Función para cargar y mostrar consejos
function cargarYMostrarConsejos() {
  let consejosGuardados = localStorage.getItem('consejos');
  
  // Si no hay consejos guardados, usar los por defecto
  if (!consejosGuardados || consejosGuardados === '[]') {
    localStorage.setItem('consejos', JSON.stringify(consejosPorDefecto));
    consejosGuardados = JSON.stringify(consejosPorDefecto);
  }
  
  const consejos = JSON.parse(consejosGuardados);
  const main = document.querySelector('.flex-main');
  const primerH1 = main.querySelector('h1');
  
  // Limpiar consejos existentes
  const consejosAntiguos = main.querySelectorAll('.accordion, .panel');
  consejosAntiguos.forEach(el => el.remove());
  
  // Insertar cada consejo guardado EN ORDEN INVERSO para que el primero quede arriba
  for (let i = consejos.length - 1; i >= 0; i--) {
    const consejo = consejos[i];
    const nuevoAccordion = document.createElement('button');
    nuevoAccordion.className = 'accordion';
    nuevoAccordion.textContent = consejo.titulo;
    
    const nuevoPanel = document.createElement('div');
    nuevoPanel.className = 'panel';
    const parrafo = document.createElement('p');
    parrafo.textContent = consejo.descripcion;
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
  
  // Obtener TODOS los consejos actuales
  todosLosAccordions.forEach(accordion => {
    const panel = accordion.nextElementSibling;
    const descripcion = panel.querySelector('p').textContent;
    
    consejos.push({
      titulo: accordion.textContent,
      descripcion: descripcion
    });
  });
  
  // Mantener solo los últimos 4 consejos
  if (consejos.length > 4) {
    consejos.splice(4);
  }
  
  localStorage.setItem('consejos', JSON.stringify(consejos));
}

// Función para agregar un nuevo consejo
function agregarConsejo(titulo, descripcion) {
  const main = document.querySelector('.flex-main');
  
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
  
  // Obtener el primer h1 (donde dice "Consejos de la comunidad:")
  const primerH1 = main.querySelector('h1');
  
  // Insertar el nuevo consejo después del h1
  primerH1.after(nuevoPanel);
  primerH1.after(nuevoAccordion);
  
  // Eliminar el último consejo si hay más de 4
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
function enviarConsejo() {
  const inputTitulo = document.querySelector('.input-titulo');
  const inputDescripcion = document.querySelector('.input-descripcion');
  
  const titulo = inputTitulo.value.trim();
  const descripcion = inputDescripcion.value.trim();
  
  // Validar que ambos campos tengan contenido
  if (titulo && descripcion) {
    agregarConsejo(titulo, descripcion);
    
    // Limpiar los inputs
    inputTitulo.value = '';
    inputDescripcion.value = '';
  } else {
    alert('Por favor, completa tanto el título como la descripción del consejo.');
  }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Cargar consejos al iniciar la página
  cargarYMostrarConsejos();

  // Obtener referencias a los inputs
  const inputTitulo = document.querySelector('.input-titulo');
  const inputDescripcion = document.querySelector('.input-descripcion');

  // Escuchar el evento Enter en ambos inputs
  inputTitulo.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      enviarConsejo();
    }
  });

  inputDescripcion.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      enviarConsejo();
    }
  });
});