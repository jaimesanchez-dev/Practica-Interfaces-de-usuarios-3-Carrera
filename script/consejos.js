// consejos.js

import { mostrarConsejos, enviarConsejo } from './consejosAcciones.mjs';
import { cargar_idioma, aplicarIdioma } from './idioma.mjs';

document.addEventListener('DOMContentLoaded', () => {

  // Gestión del idioma
  cargar_idioma();

  const selector = document.querySelector(".header-idioma");
  if (selector) {
      selector.addEventListener("change", () => {
          const idioma = selector.value;
          localStorage.setItem("idioma", idioma);
          aplicarIdioma(idioma);
      });
  }
    
  // Mostrar consejos al cargar
  mostrarConsejos();

  // Obtener inputs
  const inputTitulo = document.querySelector('.input-titulo');
  const inputDescripcion = document.querySelector('.input-descripcion');

  // Escuchar el evento Enter en ambos inputs
  [inputTitulo, inputDescripcion].forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') enviarConsejo(inputTitulo, inputDescripcion);
    });
  });
});
