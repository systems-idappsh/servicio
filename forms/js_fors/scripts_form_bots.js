document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const submitButton = document.getElementById("submitButton");
    let currentSection = 0;

    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle("active", i === index);
        });
        prevButton.style.display = index === 0 ? "none" : "inline-block";
        nextButton.style.display = index === sections.length - 1 ? "none" : "inline-block";
        submitButton.style.display = index === sections.length - 1 ? "inline-block" : "none";
    }

    function validateInput(input) {
        const value = input.value.trim();
        const errorElement = document.getElementById(`${input.id}_error`);
        const correctElement = document.getElementById(`${input.id}_correcto`);
        let valid = true;

        if (input.required && !value) {
            valid = false;
            errorElement.textContent = "Este campo es obligatorio.";
        } else if (input.type === "text" && !/^[a-zA-Z\s]+$/.test(value)) {
            valid = false;
            errorElement.textContent = "Este campo debe contener solo letras.";
        } else if (input.type === "tel" && !/^\+?\d{10,15}$/.test(value)) {
            valid = false;
            errorElement.textContent = "Por favor ingresa un número telefónico válido.";
        } else if (input.type === "email" && !/\S+@\S+\.\S+/.test(value)) {
            valid = false;
            errorElement.textContent = "Por favor ingresa un correo electrónico válido.";
        } else if (input.type === "number" && (isNaN(value) || value <= 0)) {
            valid = false;
            errorElement.textContent = "Por favor ingresa una cantidad válida.";
        }

        if (valid) {
            input.classList.add("input-correcto");
            input.classList.remove("input-incorrecto");
            errorElement.style.display = "none";
            correctElement.style.display = "block";
        } else {
            input.classList.add("input-incorrecto");
            input.classList.remove("input-correcto");
            errorElement.style.display = "block";
            correctElement.style.display = "none";
        }
        return valid;
    }

    function validateSection(index) {
        const section = sections[index];
        const inputs = section.querySelectorAll("input[required], select[required], textarea[required]");
        let valid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) valid = false;
        });

        return valid;
    }

    nextButton.addEventListener("click", function () {
        if (validateSection(currentSection)) {
            currentSection++;
            if (currentSection >= sections.length) {
                document.getElementById("clientForm").submit();
                return;
            }
            showSection(currentSection);
        }
    });

    prevButton.addEventListener("click", function () {
        currentSection--;
        showSection(currentSection);
    });

    sections.forEach(section => {
        section.addEventListener("input", function (event) {
            validateInput(event.target);
        });
    });

    showSection(currentSection);
});

// Nueva función para alternar la visibilidad de la contraseña
const passwordField = document.getElementById("passwordVisas");
const showPasswordCheckbox = document.getElementById("showPasswordCheckbox");

showPasswordCheckbox.addEventListener("change", function () {
    passwordField.type = this.checked ? "text" : "password";
});

