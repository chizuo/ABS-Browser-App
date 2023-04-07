var lengthReq = false;
var upperReq = false;
var numberReq = false;
var startReq = false;

function register() {
    $('.navbar-nav').html(`<li class="nav-item ms-auto">
        <a class="nav-link active register" aria-current="page" href="#">Register</a>
    </li>`);

    $('#form-app').html(`
        <img class="mb-4" src="./assets/img/inactive/playlist_tracker_icon_128.png" alt="" width="72" height="72">
        <h1 class="h3 mb-3 fw-normal">Please complete to register</h1>
        <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="name@example.com">
            <label for="email">Email address</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="password" placeholder="Password">
            <label for="password">Password</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="confirm-password" placeholder="Confirm Password">
            <label for="confirm-password">Confirm Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" id="register-button" type="submit">Register</button>
        <div class="container">
            <span class="container-fluid py-2">
                Already have an account? <a href="login.html" id="login">Log In</a>
            </span>
        </div>
        <div class="container" id="system"></div>
        <p class="mt-5 mb-3 text-muted">© A Better Subscription 2023</p>
    `);
    $('#register-button').prop('disabled', true);
    $('#confirm-password').prop('disabled', true);
    $('#password').on('input', checkStrength);
    $('#confirm-password').on('input', validatePassword);

    $('form').submit(async function(event) {
        event.preventDefault();
        $('#system').html('');
        try {
            const response = await axios.post('http://chuadevs.com:12312/v1/account/register', { email: $('#email').val(), password: $('#password').val() });
            localStorage.setItem('abs_account', JSON.stringify(response.data));
            window.location.href = 'popup.html';
        } catch(e) {
            $('#system').html(e.message);
        }
    });
}

async function login(event) {
    event.preventDefault();
    $('#system').html('');
    try {
        const response = await axios.post('http://localhost:12312/v1/account/', { email: $('#email').val(), password: $('#password').val() });
        localStorage.setItem('abs_account', JSON.stringify(response.data));
        window.location.href = 'popup.html';
    } catch(e) {
        $('#system').html(e.message);
    }
}

function checkStrength() {
    let password = $('#password').val();
    let message = "";
    
    if(password.length > 0) {
        startReq = !(/^\d/.test(password));
        upperReq = /[A-Z]/.test(password);
        numberReq = /\d/.test(password);
        lengthReq = password.length >= 8;

        if(!lengthReq) message += "Length >= 8<br>";
        if(!upperReq) message += "Has Uppercase<br>";
        if(!numberReq) message += "Contains a number";
        if(!startReq) message += "Cannot start with a number";
    }

    if(message.length > 0) $('#system').html(`<div>Password requirements:</div>${message}`); 
    else $('#system').html('');

    if (upperReq && numberReq && startReq && lengthReq) {
        $('#password').removeClass('is-invalid');
        $('#confirm-password').prop('disabled', false);
        if(($('#confirm-password').val()).length) validatePassword();
    } else {
        $('#password').addClass('is-invalid');
        $('#confirm-password').prop('disabled', true);
    }
}

function validatePassword() {
    let password = $('#password').val();
    let confirmPassword = $('#confirm-password').val();
    if (password !== confirmPassword) {
        $('#system').html('passwords do not match');
        $('#confirm-password').addClass('is-invalid');
        $('#register-button').prop('disabled', true);
    } else {
        $('#system').html('');
        $('#confirm-password').removeClass('is-invalid');
        $('#register-button').prop('disabled', false);
    }
}

function init() {
    $('.register').click(register);
    $('#signin-button').click(login);
}

$(document).ready(function() { init(); });