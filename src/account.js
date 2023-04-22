const account = JSON.parse(localStorage.getItem('abs_account'));

function accountOptions() {
    $('#app').html(`<br><br><center>
        <div class="btn-group mr-1" role="group" aria-label="Button group with four buttons">
            <button type="button" class="btn btn-secondary border" id="email-button">Update email</button>
            <button type="button" class="btn btn-secondary border" id="password-button">Update password</button>
            <button type="button" class="btn btn-secondary border" id="metrics-button">Account metrics</button>
        </div>
    </center>`);
    footer();
    $('#email-button').click(emailUpdate);
    $('#password-button').click(passwordUpdate);
    $('#metrics-button').click(dashboard);
}

function dashboard() {

}

function emailUpdate() {

}

function footer() {
    $('#app').append(`<br><center><hr>
    <div class="container" id="system"></div>
    <p class="mt-2 mb-2 text-muted">© A Better Subscription 2023</p>
    </center>`);
}

function init() {
    main();
}

function main() {
    $('body').html(`
        <nav class="navbar navbar-light" style="background-color: #eef1ef;">
            <div class="container-fluid">
                <a class="navbar-brand me-auto" href="#">
                    <img src="/assets/img/inactive/playlist_tracker_icon_32.png">
                </a>
                <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav"></ul>
                </div>
            </div>
        </nav>   
        <div id="app"></div>
    `);
    nav();
    accountOptions();
}

function nav() { 
    $('.navbar-nav').html(`
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="playlist-manager">Playlist Manager</a>
            </li>
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="playlist-view">Return to Playlists</a>
            </li>
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="log-off">Log off</a>
            </li>
    `);
    $('#log-off').click(async function() { 
        try {
            await axios.put('http://chuadevs.com:12312/v1/account/sync', account);
            localStorage.removeItem('abs_account');
            await chrome.storage.local.remove('abs_account', () => { location.reload(); })
        } catch(e) {
            $('#system').html(e.message);
        }
    });
    $('#playlist-manager').click(() => window.location.href = 'playlists.html');
    $('#playlist-view').click(() => window.location.href = 'popup.html');
}

function passwordUpdate() {

}

$(document).ready(function() { init(); });