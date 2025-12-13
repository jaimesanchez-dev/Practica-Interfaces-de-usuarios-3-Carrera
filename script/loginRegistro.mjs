// loginRegistro.mjs

import { validarNombre, validarApellidos, validarPassword } from "./validaciones.mjs";

export function inicializarRegistro() {
    if (!window.location.pathname.includes("Registro.html")) return;

    const registerForm = document.querySelector(".login-form");
    if (!registerForm) return;

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const username = document.getElementById("nombre_usuario").value.trim();
        const password = document.getElementById("contrasena").value;
        const fotoInput = document.getElementById("foto");

        if (!validarNombre(nombre)) {
            alert("El campo Nombre solo puede contener letras y debe tener al menos 3 caracteres.");
            return;
        }

        if (!validarApellidos(apellidos)) {
            alert("Debes escribir al menos dos apellidos, cada uno con al menos 3 letras.");
            return;
        }

        if (!validarPassword(password)) {
            alert("La contraseña debe tener al menos 8 caracteres, 2 números, 1 carácter especial, 1 mayúscula y 1 minúscula.");
            return;
        }

        if (localStorage.getItem("user_" + username)) {
            alert("El usuario ya existe.");
            return;
        }

        function guardarUsuario(fotoBase64) {
            const userData = {
                nombre,
                apellidos,
                username,
                password,
                foto: fotoBase64 || "./images/avatar-usuario.jpg"
            };

            localStorage.setItem("user_" + username, JSON.stringify(userData));
            alert("Registro exitoso!");
            window.location.href = "InicioSesion.html";
        }
        // Si el usuario sube una foto la convertimos a Base64
        if (fotoInput.files && fotoInput.files[0]) {
            const archivo = fotoInput.files[0];
            const lector = new FileReader();
            lector.onload = function (e) {
                guardarUsuario(e.target.result);
            };
            lector.readAsDataURL(archivo);
        } else {
            guardarUsuario(null);// No subió foto
        }
    });
}

export function inicializarLogin() {
    if (!window.location.pathname.includes("InicioSesion.html")) return;

    const loginForm = document.querySelector(".login-form");
    if (!loginForm) return;

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("nombre").value;
        const password = document.getElementById("contrasena").value;

        const DatosUsuario = localStorage.getItem("user_" + username);

        if (!DatosUsuario) {
            alert("Usuario no encontrado.");
            return;
        }

        const userData = JSON.parse(DatosUsuario);

        if (userData.password === password) {
            alert('Inicio de sesión exitoso!');
            localStorage.setItem('currentUser', username);
            window.location.href = 'Home.html';
        } else {
            alert('Contraseña incorrecta.');
        }
    });
}


export function actualizarHeader() {
    const headerAuth = document.getElementById("header-auth");
    if (!headerAuth) return;

    const currentUser = localStorage.getItem("currentUser");

    if (currentUser) {
        const userData = JSON.parse(localStorage.getItem("user_" + currentUser));

        const userImage = userData.foto || `https://ui-avatars.com/api/?name=${userData.nombre}&background=random`;

        headerAuth.innerHTML = `
            <div class="user-menu">
                <img src="${userImage}" class="user-avatar">
                <span class="user-name">${userData.nombre}</span>
                <button id="btn-logout" class="btn-logout" data-i18n="cerrar_sesion">Cerrar sesión</button>
            </div>
        `;

        document.getElementById("btn-logout").addEventListener("click", () => {
            if (confirm(`¿Seguro que quieres cerrar sesión, ${userData.nombre}?`)) {
                localStorage.removeItem("currentUser");
                window.location.reload();
            }
        });

    } else {
        headerAuth.innerHTML = `
            <div class="grupo-botones">
                <button class="btn-login-new" onclick="window.location.href='InicioSesion.html'">Inicio sesión</button>
                <button class="btn-registro-new" onclick="window.location.href='Registro.html'">Registro</button>
            </div>
        `;
    }
}

