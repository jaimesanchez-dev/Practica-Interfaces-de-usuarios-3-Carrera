// Home.js
import { iniciarCarrusel } from './carrusel.mjs';

document.addEventListener('DOMContentLoaded', () => {
    iniciarCarrusel();
    
    const boton_inicio = document.querySelector(".boton-ini");
    boton_inicio.addEventListener("click", () => {window.location.href = "InicioSesion.html";});

    const boton_registro = document.querySelector(".boton-reg");
    boton_registro.addEventListener("click", () => {window.location.href = "Registro.html";});


    const carrusel1 = document.getElementById("b1");
    const carrusel2 = document.getElementById("b2");
    const carrusel3 = document.getElementById("b3");
    const carrusel4 = document.getElementById("b4");
    const carrusel5 = document.getElementById("b5");
    const carrusel6 = document.getElementById("b6");
    const carrusel7 = document.getElementById("b7");
    const carrusel8 = document.getElementById("b8");

    carrusel1.addEventListener("click", () => {
        localStorage.setItem("carrusel", "1");
        window.location.href = "ComprarProducto.html";
    });
    carrusel2.addEventListener("click", () => {
        localStorage.setItem("carrusel", "2");
        window.location.href = "ComprarProducto.html";
    });
    carrusel3.addEventListener("click", () => {
        localStorage.setItem("carrusel", "3");
        window.location.href = "ComprarProducto.html";
    });
    carrusel4.addEventListener("click", () => {
        localStorage.setItem("carrusel", "4");
        window.location.href = "ComprarProducto.html";
    });
    carrusel5.addEventListener("click", () => {
        localStorage.setItem("carrusel", "5");
        window.location.href = "ComprarProducto.html";
    });
    carrusel6.addEventListener("click", () => {
        localStorage.setItem("carrusel", "6");
        window.location.href = "ComprarProducto.html";
    });
    carrusel7.addEventListener("click", () => {
        localStorage.setItem("carrusel", "7");
        window.location.href = "ComprarProducto.html";
    });
    carrusel8.addEventListener("click", () => {
        localStorage.setItem("carrusel", "8");
        window.location.href = "ComprarProducto.html";
    });


    const compra1 = document.getElementById("c1");
    const compra2 = document.getElementById("c2");
    const compra3 = document.getElementById("c3");
    const compra4 = document.getElementById("c4");
    const compra5 = document.getElementById("c5");
    const compra6 = document.getElementById("c6");
    
    compra1.addEventListener("click", () => {
        localStorage.setItem("experiencia", "1");
        window.location.href = "ComprarProducto.html";
    });
    compra2.addEventListener("click", () => {
        localStorage.setItem("experiencia", "2");
        window.location.href = "ComprarProducto.html";
    });
    compra3.addEventListener("click", () => {
        localStorage.setItem("experiencia", "3");
        window.location.href = "ComprarProducto.html";
    });
    compra4.addEventListener("click", () => {
        localStorage.setItem("experiencia", "4");
        window.location.href = "ComprarProducto.html";
    });
    compra5.addEventListener("click", () => {
        localStorage.setItem("experiencia", "5");
        window.location.href = "ComprarProducto.html";
    });
    compra6.addEventListener("click", () => {
        localStorage.setItem("experiencia", "6");
        window.location.href = "ComprarProducto.html";
    });

    
});