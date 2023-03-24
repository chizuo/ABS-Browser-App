function register() {
    $('#form-app').html(`
        <img class="mb-4" src="./assets/img/color/playlist_tracker_icon_128.png" alt="" width="72" height="72">
        <h1 class="h3 mb-3 fw-normal">Please complete to register</h1>
        <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
        </div>
        <div class="form-floating">
            <input type="password" class="form-control" id="confirmFloatingPassword" placeholder="Confirm Password">
            <label for="confirmFloatingPassword">Confirm Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
        <div class="container">
            <span class="container-fluid py-2">
                Already have an account? <a href="login.html" id="login">Log In</a>
            </span>
        </div>
        <p class="mt-5 mb-3 text-muted">© A Better Subscription 2023</p>
    `);
}

function init() {
    $('#register').click(register);
}

$(document).ready(function() { init(); });