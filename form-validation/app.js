const INPUT_VALIDATION = {
    NAME: {
        FORMAT: /^[a-zA-ZÀ-ỹ\s]+$/,
        MESSAGE: "Invalid name"
    },
    EMAIL: {
        FORMAT: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        MESSAGE: "Invalid email address"
    },
    PASSWORD: {
        FORMAT: /^(?=.*[a-z])(?=.*[A-Z]).{8,32}$/,
        MESSAGE: "Password must be 8-32 characters long and contain at least one uppercase and one lowercase letter"
    },
    EMPTY: {
        MESSAGE: "This field cannot be empty"
    },
    CONFIRM_PASSWORD: {
        MESSAGE: "Passwords do not match"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const nameInput = document.querySelector('.sign-up-container input[placeholder="Name"]');
    const emailInput = document.querySelector('.sign-up-container input[placeholder="Email"]');
    const passwordInput = document.querySelector('.sign-up-container input[placeholder="Password"]');
    const confirmPasswordInput = document.querySelector('.sign-up-container input[placeholder="ConfirmPassword"]');
    const signUpForm = document.querySelector('.sign-up-container form');
    const submitButton = document.querySelector('.sign-up-container button[type="submit"]');
    const successPopup = document.getElementById('successPopup');
    const closePopupButton = document.getElementById('closePopup');

    signUpButton.addEventListener('click', () => container.classList.add("right-panel-active"));
    signInButton.addEventListener('click', () => container.classList.remove("right-panel-active"));

    function validateInput(input, validationType) {
        return INPUT_VALIDATION[validationType].FORMAT.test(input);
    }

    function showPopup() {
        successPopup.style.display = 'block';
    }

    function closePopup() {
        successPopup.style.display = 'none';
    }

    closePopupButton.addEventListener('click', closePopup);

    function showError(input, message) {
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginBottom = '10px';
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        errorElement.textContent = message;
        input.classList.add('error');
    }

    function hideError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
        input.classList.remove('error');
    }

    function validateField(input) {
        if (!input.dataset.touched) return true;

        if (input.value.trim() === '') {
            showError(input, INPUT_VALIDATION.EMPTY.MESSAGE);
            return false;
        }

        switch (input) {
            case nameInput:
                if (!validateInput(input.value, 'NAME')) {
                    showError(input, INPUT_VALIDATION.NAME.MESSAGE);
                    return false;
                }
                break;
            case emailInput:
                if (!validateInput(input.value, 'EMAIL')) {
                    showError(input, INPUT_VALIDATION.EMAIL.MESSAGE);
                    return false;
                }
                break;
            case passwordInput:
                if (!validateInput(input.value, 'PASSWORD')) {
                    showError(input, INPUT_VALIDATION.PASSWORD.MESSAGE);
                    return false;
                }
                break;
            case confirmPasswordInput:
                if (input.value !== passwordInput.value) {
                    showError(input, INPUT_VALIDATION.CONFIRM_PASSWORD.MESSAGE);
                    return false;
                }
                break;
        }

        hideError(input);
        return true;
    }

    function validateForm() {
        return [nameInput, emailInput, passwordInput, confirmPasswordInput].every(validateField);
    }

    function updateSubmitButton() {
        submitButton.disabled = !validateForm();
    }

    [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('focus', () => input.dataset.touched = 'true');
        input.addEventListener('input', () => {
            validateField(input);
            if (input === passwordInput) validateField(confirmPasswordInput);
            updateSubmitButton();
        });
        input.addEventListener('blur', () => {
            validateField(input);
            updateSubmitButton();
        });
    });

    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => input.dataset.touched = 'true');

        if (validateForm()) {
            showPopup();
            this.reset();
            [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
                input.dataset.touched = 'false';
                hideError(input);
            });
        } else {
            updateSubmitButton();
        }
    });

    updateSubmitButton();
});
