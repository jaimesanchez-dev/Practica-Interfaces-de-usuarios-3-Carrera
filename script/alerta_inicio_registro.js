

document.addEventListener("DOMContentLoaded", () => {
    
    // Controlamos a que páginas puede acceder el usuario si no ha iniciado sesión
    const user = localStorage.getItem("currentUser");
    const consejosLink = document.getElementById("link-consejos");
    const perfilLink = document.getElementById("link-perfil");
    
    consejosLink.addEventListener("click", (e) => {
        if (!user) {
            e.preventDefault();
            alert("Debes iniciar sesión para acceder a la página de consejos.");
        }
    });
    
    perfilLink.addEventListener("click", (e) => {
        if (!user) {
            e.preventDefault();
            alert("Debes iniciar sesión para acceder a la página del perfil.");
        }
    });


})