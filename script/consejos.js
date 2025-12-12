// consejos.js

import { mostrarConsejos, enviarConsejo } from './consejosAcciones.mjs';

document.addEventListener('DOMContentLoaded', () => {
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
