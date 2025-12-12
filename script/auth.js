document.addEventListener('DOMContentLoaded', () => {

    // Controlamos el acceso a los enlaces no implementados
    const enlacesNoImplementados = document.querySelectorAll('a[href="#"]');
    enlacesNoImplementados.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            e.preventDefault();
            alert("Esta opción no está implementada");
        });
    });

    if (window.location.pathname.includes('Registro.html')) {
        const registerForm = document.querySelector('.login-form');

        function validarNombre(valor) {
            const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
            return regex.test(valor) && valor.trim().length >= 3;
        }

        function validarApellidos(valor) {
            const regex = /^([A-Za-zÁÉÍÓÚáéíóúÑñ]{3,})(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,})+$/;
            return regex.test(valor.trim());
        }

        function validarPassword(valor) {
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[^A-Za-z0-9]).{8,}$/;
            return regex.test(valor);
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const nombreInput = document.getElementById('nombre');
                const apellidosInput = document.getElementById('apellidos');
                const usernameInput = document.getElementById('nombre_usuario');
                const passwordInput = document.getElementById('contrasena');
                const fotoInput = document.getElementById('foto');  // <- FOTO

                const nombre = nombreInput.value.trim();
                const apellidos = apellidosInput.value.trim();
                const username = usernameInput.value.trim();
                const password = passwordInput.value;

                if (!validarNombre(nombre)) {
                    alert("El campo Nombre solo puede contener letras y debe tener al menos 3 caracteres.");
                    nombreInput.focus();
                    return;
                }

                if (!validarApellidos(apellidos)) {
                    alert("Debes escribir al menos dos apellidos, cada uno con al menos 3 letras.");
                    apellidosInput.focus();
                    return;
                }

                if (!validarPassword(password)) {
                    alert("La contraseña debe tener al menos 8 caracteres, 2 números, 1 carácter especial, 1 mayúscula y 1 minúscula.");
                    passwordInput.focus();
                    return;
                }

                if (localStorage.getItem('user_' + username)) {
                    alert('El usuario ya existe.');
                    return;
                }
                // Convertir foto a Base64
                function guardarUsuario(fotoBase64) {
                    const userData = {
                        nombre: nombre,
                        apellidos: apellidos,
                        username: username,
                        password: password,
                        foto: fotoBase64 || "./images/avatar-usuario.jpg" // si no sube, avatar por defecto
                    };

                    localStorage.setItem('user_' + username, JSON.stringify(userData));

                    alert('Registro exitoso! Ahora puedes iniciar sesión.');
                    window.location.href = 'InicioSesion.html';
                }
                
                // Si el usuario sube una foto → convertirla a Base64
                if (fotoInput.files && fotoInput.files[0]) {
                    const archivo = fotoInput.files[0];
                    const lector = new FileReader();

                    lector.onload = function (e) {
                        guardarUsuario(e.target.result); // Base64 listo
                    };

                    lector.readAsDataURL(archivo);
                } else {
                    guardarUsuario(null); // No subió foto
                }
            });
        }
    }

    // ---- INICIO SESIÓN ----
    if (window.location.pathname.includes('InicioSesion.html')) {
        const loginForm = document.querySelector('.login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const usernameInput = document.getElementById('nombre');
                const passwordInput = document.getElementById('contrasena');

                const username = usernameInput.value;
                const password = passwordInput.value;

                const storedData = localStorage.getItem('user_' + username);

                if (storedData) {
                    const userData = JSON.parse(storedData);
                    if (userData.password === password) {
                        alert('Inicio de sesión exitoso!');
                        localStorage.setItem('currentUser', username);
                        window.location.href = 'Home.html';
                    } else {
                        alert('Contraseña incorrecta.');
                    }
                } else {
                    alert('Usuario no encontrado.');
                }
            });
        }
    }


    // ---- HEADER DINÁMICO ----
    function actualizarHeader() {
        const headerAuth = document.getElementById('header-auth');

        if (!headerAuth) return;

        const currentUser = localStorage.getItem('currentUser');

        if (currentUser) {
            const userDataStr = localStorage.getItem('user_' + currentUser);
            const userData = userDataStr ? JSON.parse(userDataStr) : { nombre: currentUser };

            // SI HAY FOTO DE PERFIL LA USAMOS
            const userImage = userData.foto
                ? userData.foto
                : `https://ui-avatars.com/api/?name=${userData.nombre}&background=random`;

            headerAuth.innerHTML = `
                <div class="user-menu">
                    <img src="${userImage}" alt="${userData.nombre}" class="user-avatar">
                    <span class="user-name">${userData.nombre}</span>
                    <button id="btn-logout" class="btn-logout">Cerrar sesión</button>
                </div>
            `;

            document.getElementById('btn-logout').addEventListener('click', () => {
                if (confirm(`¿Seguro que quieres cerrar sesión, ${userData.nombre}?`)) {
                    localStorage.removeItem('currentUser');
                    actualizarHeader();
                    if (window.location.pathname.includes('PerfilUsuario.html')) {
                        window.location.href = 'Home.html';
                    } else {
                        window.location.reload();
                    }
                }
            });

        } else {
            headerAuth.innerHTML = `
                <div class="grupo-botones">
                    <button class="btn-login-new" onclick="window.location.href='InicioSesion.html'">Inicio sesion</button>
                    <button class="btn-registro-new" onclick="window.location.href='Registro.html'">Registro</button>
                </div>
            `;
        }
    }

    actualizarHeader();
});
