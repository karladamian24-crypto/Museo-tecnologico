

document.addEventListener("DOMContentLoaded", function () {

    // Referencias a los elementos del formulario
    const formulario       = document.getElementById("formularioContacto");
    const mensajeRespuesta = document.getElementById("mensajeRespuesta");

    // Seguridad: si no existe el formulario, no continuar
    if (!formulario) return;

    // ------------------------------------------------
    // Función para mostrar mensajes de éxito o error
    // ------------------------------------------------
    function mostrarMensaje(texto, tipo) {
        mensajeRespuesta.textContent = texto;
        mensajeRespuesta.className   = "mensaje-respuesta " + tipo;
        mensajeRespuesta.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // ------------------------------------------------
    // Función para limpiar los errores visuales
    // ------------------------------------------------
    function limpiarErrores() {
        formulario.querySelectorAll(".invalido").forEach(el => el.classList.remove("invalido"));
    }

    // ------------------------------------------------
    // Evento principal: envío del formulario
    // ------------------------------------------------
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault(); // Evita el envío real
        limpiarErrores();

        // Captura de valores del formulario
        const nombre  = document.getElementById("nombre").value.trim();
        const correo  = document.getElementById("correo").value.trim();
        const asunto  = document.getElementById("asunto").value;
        const mensaje = document.getElementById("mensaje").value.trim();

        let errores = [];

        // ----- Validación del nombre -----
        if (nombre.length < 3) {
            errores.push("El nombre debe tener al menos 3 caracteres.");
            document.getElementById("nombre").classList.add("invalido");
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(nombre)) {
            errores.push("El nombre solo puede contener letras y espacios.");
            document.getElementById("nombre").classList.add("invalido");
        }

        // ----- Validación del correo -----
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo)) {
            errores.push("Ingresa un correo electrónico válido.");
            document.getElementById("correo").classList.add("invalido");
        }

        // ----- Validación del asunto -----
        if (!asunto) {
            errores.push("Debes seleccionar un asunto.");
            document.getElementById("asunto").classList.add("invalido");
        }

        // ----- Validación del mensaje -----
        if (mensaje.length < 10) {
            errores.push("El mensaje debe tener al menos 10 caracteres.");
            document.getElementById("mensaje").classList.add("invalido");
        }
        if (mensaje.length > 500) {
            errores.push("El mensaje no debe superar los 500 caracteres.");
            document.getElementById("mensaje").classList.add("invalido");
        }

        // ----- Mostrar errores o confirmar envío -----
        if (errores.length > 0) {
            mostrarMensaje("⚠ " + errores.join(" "), "error");
        } else {
            mostrarMensaje(
                "✅ ¡Mensaje enviado con éxito, " + nombre + "! Nos pondremos en contacto contigo pronto al correo: " + correo,
                "exito"
            );
            formulario.reset(); // Limpia los campos

            // Oculta el mensaje después de 6 segundos
            setTimeout(() => {
                mensajeRespuesta.className = "mensaje-respuesta";
                mensajeRespuesta.textContent = "";
            }, 6000);
        }
    });

    // ------------------------------------------------
    // Limpieza de errores al corregir un campo
    // ------------------------------------------------
    ["nombre", "correo", "asunto", "mensaje"].forEach(id => {
        const campo = document.getElementById(id);
        if (campo) {
            campo.addEventListener("input", () => campo.classList.remove("invalido"));
        }
    });
});