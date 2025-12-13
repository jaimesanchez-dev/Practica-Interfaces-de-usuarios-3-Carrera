// consejos.js

import { mostrarConsejos, enviarConsejo } from './consejosAcciones.mjs';
import { cargar_idioma, aplicarIdioma } from './idioma.mjs';
import { cargar_moneda } from './moneda.mjs';

document.addEventListener('DOMContentLoaded', () => {

  // Cargamos el idioma guardado
  cargar_idioma();

  // Selector de idioma
  const selector = document.querySelector(".header-idioma");
  if (selector) {
      selector.addEventListener("change", () => {
          const idioma = selector.value;
          localStorage.setItem("idioma", idioma);
          aplicarIdioma(idioma);
      });
  }
    
  // Mostramos los consejos al cargar la página
  mostrarConsejos();

  // Obtenemos los inputs del formulario
  const inputTitulo = document.querySelector('.input-titulo');
  const inputDescripcion = document.querySelector('.input-descripcion');

  // Enviar consejo al pulsar Enter en cualquiera de los inputs
  [inputTitulo, inputDescripcion].forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') enviarConsejo(inputTitulo, inputDescripcion);
    });
  });

    // Cargamos la moneda
    cargar_moneda()
});
