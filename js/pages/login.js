"use strict";

/*==========================================================
AI DISASTER COMMAND CENTER
LOGIN SCRIPT
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    const togglePassword = document.getElementById("togglePassword");
    const rememberMe = document.getElementById("rememberMe");

    const loadingOverlay = document.getElementById("loginLoading");

    initRememberMe();
    initPasswordToggle();
    initFormValidation();

    /*======================================================
    REMEMBER ME
    ======================================================*/

    function initRememberMe() {

        const savedUser = localStorage.getItem("adc_operator");

        if (savedUser) {

            username.value = savedUser;
            rememberMe.checked = true;

        }

    }

    /*======================================================
    PASSWORD TOGGLE
    ======================================================*/

    function initPasswordToggle() {

        togglePassword.addEventListener("click", () => {

            const isHidden = password.type === "password";

            password.type = isHidden ? "text" : "password";

            togglePassword.innerHTML = isHidden
                ? '<i class="fas fa-eye-slash"></i>'
                : '<i class="fas fa-eye"></i>';

        });

    }

    /*======================================================
    FORM
    ======================================================*/

    function initFormValidation() {

        loginForm.addEventListener("submit", handleLogin);

    }

    function handleLogin(event) {

        event.preventDefault();

        clearErrors();

        let valid = true;

        const user = username.value.trim();
        const pass = password.value.trim();

        if (user.length < 3) {

            usernameError.textContent =
                "Operator ID must contain at least 3 characters.";

            valid = false;

        }

        if (pass.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        }

        if (!valid) {

            return;

        }

        if (rememberMe.checked) {

            localStorage.setItem("adc_operator", user);

        } else {

            localStorage.removeItem("adc_operator");

        }

        showLoading();

    }

    function clearErrors() {

        usernameError.textContent = "";
        passwordError.textContent = "";

    }
        /*======================================================
    LOADING
    ======================================================*/

    function showLoading() {

        loadingOverlay.classList.add("active");

        const submitButton = loginForm.querySelector(".adc-login-btn");

        submitButton.disabled = true;

        submitButton.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Authenticating...</span>
        `;

        setTimeout(() => {

            window.location.href = "loading.html";

        }, 2200);

    }

    /*======================================================
    KEYBOARD SHORTCUTS
    ======================================================*/

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            usernameError.textContent = "";
            passwordError.textContent = "";

        }

    });

    /*======================================================
    LIVE INPUT VALIDATION
    ======================================================*/

    username.addEventListener("input", () => {

        if (username.value.trim().length >= 3) {

            usernameError.textContent = "";

        }

    });

    password.addEventListener("input", () => {

        if (password.value.trim().length >= 6) {

            passwordError.textContent = "";

        }

    });

    /*======================================================
    AUTO FOCUS
    ======================================================*/

    window.requestAnimationFrame(() => {

        username.focus();

    });

});