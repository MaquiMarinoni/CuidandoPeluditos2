document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const inputs = formulario.querySelectorAll('input');
    const selects = formulario.querySelectorAll('select');

    // Expresiones regulares para validación
    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ // Formato de correo
    }

    // Función para validar los campos del formulario
    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "name":
                validarCampo(expresiones.nombre, e.target, "name");
                break;
            case "email":
                validarCampo(expresiones.correo, e.target, "email");
                break;
            case "image":
                validarCampoArchivo(e.target, "image");
                break;
            case "subscription":
                validarCampoSelect(e.target, "subscription");
                break;
        }
    }

    // Función para validar los campos de texto y correo
    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(campo).classList.remove('input-error');
            document.querySelector(`#${campo} + .icon`).classList.remove('show-icon');
        } else {
            document.getElementById(campo).classList.add('input-error');
            document.querySelector(`#${campo} + .icon`).classList.add('show-icon');
        }
    }

    // Función para validar el campo de archivo
    const validarCampoArchivo = (input, campo) => {
        if (input.value.trim() !== "") {
            document.getElementById(campo).classList.remove('input-error');
            document.querySelector(`#${campo} + .icon`).classList.remove('show-icon');
        } else {
            document.getElementById(campo).classList.add('input-error');
            document.querySelector(`#${campo} + .icon`).classList.add('show-icon');
        }
    }

    // Función para validar el campo de selección
    const validarCampoSelect = (input, campo) => {
        if (input.value.trim() !== "") {
            document.getElementById(campo).classList.remove('input-error');
            document.querySelector(`#${campo} + .icon`).classList.remove('show-icon');
        } else {
            document.getElementById(campo).classList.add('input-error');
            document.querySelector(`#${campo} + .icon`).classList.add('show-icon');
        }
    }

    // Agregar eventos de validación a los inputs y selects
    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });
    selects.forEach((select) => {
        select.addEventListener('change', validarFormulario);
    });

    // Validación al enviar el formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const image = document.getElementById('image');
        const subscription = document.getElementById('subscription');
        const serviceDogWalking = document.getElementById('dog-walking').checked;
        const servicePetSitting = document.getElementById('pet-sitting').checked;

        let isValid = true;

        if (!expresiones.nombre.test(name.value)) {
            validarCampo(expresiones.nombre, name, "name");
            isValid = false;
        }

        if (!expresiones.correo.test(email.value)) {
            validarCampo(expresiones.correo, email, "email");
            isValid = false;
        }

        if (image.value.trim() === "") {
            validarCampoArchivo(image, "image");
            isValid = false;
        }

        if (subscription.value.trim() === "") {
            validarCampoSelect(subscription, "subscription");
            isValid = false;
        }

        if (!serviceDogWalking && !servicePetSitting) {
            document.getElementById("error-message").innerText = "Por favor, selecciona un tipo de servicio.";
            isValid = false;
        } else {
            document.getElementById("error-message").innerText = "";
        }

        if (isValid) {
            formulario.submit();
        }
    });
});