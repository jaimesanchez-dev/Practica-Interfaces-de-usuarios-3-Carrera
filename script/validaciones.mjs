// validaciones.mjs


export function validarNombre(valor) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(valor) && valor.trim().length >= 3;
}

export function validarApellidos(valor) {
    const regex = /^([A-Za-zÁÉÍÓÚáéíóúÑñ]{3,})(\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,})+$/;
    return regex.test(valor.trim());
}

export function validarPassword(valor) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(valor);
}


export function validarCampos(campos_formulario) {
    const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const regexNumero = /^\d{13}$|^\d{15}$|^\d{16}$|^\d{19}$/;
    const regexTitular = /^[a-zA-Z\s]{3,}$/;
    const regexCVV = /^\d{3}$/;

    // Validación de nombre
    const nombreValor = campos_formulario.nombre.value.trim()
    if (nombreValor === "") {
        alert("El campo nombre no puede estar vacío.");
        campos_formulario.nombre.focus();
        return false;
    }
    if (!regexNombre.test(nombreValor)) {
        alert("El nombre debe tener al menos 3 caracteres y solo letras o espacios.");
        campos_formulario.nombre.focus();
        return false;
    }

    // Validación de correo
    const correoValor = campos_formulario.correo.value.trim()
    if (correoValor === "") {
        alert("El campo correo no puede estar vacío.");
        campos_formulario.correo.focus();
        return false;
    }
    if (!regexCorreo.test(correoValor)) {
        alert("El correo electrónico no tiene el formato adecuado.");
        campos_formulario.correo.focus();
        return false;
    }

    // Validación del número de tarjeta
    const numeroTarjetaValor = campos_formulario.numero_tarjeta.value.trim();
    if (numeroTarjetaValor === "") {
        alert("El campo número de tarjeta no puede estar vacío.");
        campos_formulario.numero_tarjeta.focus();
        return false;
    }
    if (!regexNumero.test(numeroTarjetaValor)) {
        alert("Número de tarjeta inválido: debe tener 13, 15, 16 o 19 dígitos.");
        campos_formulario.numero_tarjeta.focus();
        return false;
    }

    // Validación del titular
    const titularValor = campos_formulario.titular_tarjeta.value.trim();
    if (titularValor === "") {
        alert("El campo titular tarjeta no puede estar vacío.");
        campos_formulario.titular_tarjeta.focus();
        return false;
    }
    if (!regexTitular.test(titularValor)) {
        alert("El titular debe tener como mínimo 3 caracteres de longitud y solo letras o espacios.");
        campos_formulario.titular_tarjeta.focus();
        return false;
    }

    // Validación del CVV
    const cvvValor = campos_formulario.cvv_tarjeta.value.trim();
    if (cvvValor === "") {
        alert("El campo CVV no puede estar vacío.");
        campos_formulario.cvv_tarjeta.focus();
        return false;
    }
    if (!regexCVV.test(cvvValor)) {
        alert("El CVV debe ser un número de 3 dígitos.");
        campos_formulario.cvv_tarjeta.focus();
        return false;
    }

    // Validación de fecha de caducidad (extra opcional)
    if (campos_formulario.fecha_caducidad_tarjeta.value === "") {
        alert("Debe indicar la fecha de caducidad de la tarjeta.");
        campos_formulario.fecha_caducidad_tarjeta.focus();
        return false;
    } else {
        const hoy = new Date();
        const fecha = new Date(campos_formulario.fecha_caducidad_tarjeta.value);
        if (fecha < hoy) {
            alert("La tarjeta está caducada.");
            campos_formulario.fecha_caducidad_tarjeta.focus();
            return false;
        }
    }

    return true;
}


export function validarFormulario() {

    const campos = {
        nombre: document.getElementById("inputNombre"),
        correo: document.querySelector("input[name='correo']"),
        numero_tarjeta: document.getElementById("inputNumeroTarjeta"),
        titular_tarjeta: document.getElementById("inputTitularTarjeta"),
        fecha_caducidad_tarjeta: document.getElementById("inputFechaCaducidadTarjeta"),
        cvv_tarjeta: document.getElementById("inputCVV")
    };
    return validarCampos(campos);
}