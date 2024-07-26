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

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    function validateName(name) {
        return /^[a-zA-ZÀ-ỹ\s]+$/.test(name);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(password);
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
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        errorElement.textContent = message;
    }

    function hideError(input) {
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    }

    function validateField(input) {
        if (!input.dataset.touched) return true;

        if (input.value.trim() === '') {
            showError(input, 'Trường này không được để trống');
            return false;
        }

        switch (input) {
            case nameInput:
                if (!validateName(input.value)) {
                    showError(input, 'Tên không hợp lệ');
                    return false;
                }
                break;
            case emailInput:
                if (!validateEmail(input.value)) {
                    showError(input, 'Email không hợp lệ');
                    return false;
                }
                break;
            case passwordInput:
                if (!validatePassword(input.value)) {
                    showError(input, 'Mật khẩu phải có 8-32 ký tự, ít nhất 1 chữ hoa và 1 chữ thường');
                    return false;
                }
                break;
            case confirmPasswordInput:
                if (input.value !== passwordInput.value) {
                    showError(input, 'Mật khẩu xác nhận không khớp');
                    return false;
                }
                break;
        }

        hideError(input);
        return true;
    }

    function validateForm() {
        const isNameValid = validateField(nameInput);
        const isEmailValid = validateField(emailInput);
        const isPasswordValid = validateField(passwordInput);
        const isConfirmPasswordValid = validateField(confirmPasswordInput);

        return isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
    }

    function updateSubmitButton() {
        submitButton.disabled = !validateForm();
    }

    [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.dataset.touched = 'true';
        });

        input.addEventListener('input', function() {
            validateField(this);
            if (this === passwordInput) {
                validateField(confirmPasswordInput);
            }
            updateSubmitButton();
        });

        input.addEventListener('blur', function() {
            validateField(this);
            updateSubmitButton();
        });
    });

    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
            input.dataset.touched = 'true';
        });

        if (validateForm()) {
            showPopup();
            this.reset();
            [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(input => {
                input.dataset.touched = 'false';
            });
        } else {
            updateSubmitButton();
        }
    });

    submitButton.addEventListener('click', function(e) {
        if (this.disabled) {
            e.preventDefault();
        }
    });

    updateSubmitButton();
});
