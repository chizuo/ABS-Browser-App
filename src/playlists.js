const account = JSON.parse(localStorage.getItem('abs_account'));

function playlistManager() {
    $('#app').addClass('text-center');
    $('#app').html(`<br><br><center>
        <div class="btn-group mr-1" role="group" aria-label="Button group with three buttons">
            <button type="button" class="btn btn-outline-secondary border" id="subscribe-button">Subscribe to playlist</button>
            <button type="button" class="btn btn-outline-secondary border" id="playlist-name-button">Change playlist name</button>
            <button type="button" class="btn btn-outline-secondary border" id="content-button">Manage playlist content</button>
        </div>
    </center>`);
    $('#subscribe-button').click(subscribe);
    $('#playlist-name-button').click(updatePlaylistName);
    $('#content-button').click(contentManager);
}

function subscribe() {
    $('#app').html(`
        <div class="container p-3">
            <img class="mb-4" src="./assets/img/inactive/playlist_tracker_icon_128.png" alt="" width="72" height="72">
            <h1 class="h3 mb-3 fw-normal">Enter a YouTube playlist URL</h1>
            <div class="form-floating p-2">
                <input type="text" class="form-control" id="playlist-url">
                <label for="playlist-url">Playlist URL</label>
            </div>
            <button class="w-100 btn btn-lg btn-primary" id="subscription-button" type="submit">Add to my subscriptions</button>
            <div class="container" id="system"></div>
        </div>
    `);
    $('#subscription-button').click(query);
    $('#subscription-button').prop('disabled', true);
    $('#playlist-url').on('input', validateYoutube);
}

function updatePlaylistName() {

}

function contentManager() {
    $('#app').removeClass('text-center');
    $('#app').html(`<center>
    <div class="btn-group mr-1" role="group" aria-label="Button group with three buttons">
        <button type="button" class="btn btn-primary content-manager" value="watch">Watched</button>
        <button type="button" class="btn btn-primary content-manager" value="unwatch">Unwatched</button>
        <button type="button" class="btn btn-primary content-manager" value="delete">Delete</button>
    </div>
    </center>`);

    for(let i = 0; i < account.playlists.length; i++) {            
        let { playlist_title, contents }  = account.playlists[i];
        $('#app').append(`<div class="bg-secondary text-bg-secondary p-1 border-top border-bottom title-bar" index="${i}">
            <span class="expansion-button" id="expansion-button-${i}" index="${i}"><img src="assets/img/active/playlist_tracker_icon_24.png"></span> 
            <span class="mx-1">${playlist_title} (size: ${contents.length})</span>
        </div>
        <div class="playlist" id="playlist-${i}"></div>`);
        for(let j = 0; j < contents.length; j++) {
            let value = JSON.stringify({playlist:i, content:j});
            $(`#playlist-${i}`).append(`<input type="checkbox" class="playlist-entry" value=${value} id="playlist-entry${j}" name="playlist-entry${j}">
            <label class="checkbox-label" for="playlist-entry${j}">${contents[j].title}</label><br>`);
        }
    }
    $('.expansion-button').click(hide);
    $('.content-manager').click(markSelected);
}

function markSelected() {
    const selected = $('input[type="checkbox"]:checked');
    const command = $(this).val();
    account.actions += 1;
    if(selected.length > 0) {
        chrome.storage.local.set({'abs_newData': true}, () => {
            selected.each(function() {
                const { playlist, content} = JSON.parse($(this).val());
                account.playlists[playlist].clicked += 1;
                if(command === "watch") account.playlists[playlist].contents[content].viewed = true;
                else if (command === "unwatch") account.playlists[playlist].contents[content].viewed = false;
                else if (command === "delete") account.playlists[playlist].contents.splice(content, 1);
                else console.log('command error');
            });
            localStorage.setItem('abs_account', JSON.stringify(account));
            chrome.storage.local.set({'abs_account': account}, () => window.location.href = "popup.html");
        });
    } else {
        window.location.href = "playlists.html";
    }   
}

function hide() {
    let id = $(this).attr('index');
    if($(`#playlist-${id}`).is(':hidden')) {
        $(`#playlist-${id}`).show();
        $(`#expansion-button-${id}`).html('<img src="assets/img/active/playlist_tracker_icon_24.png">');
    } else {
        $(`#playlist-${id}`).hide();
        $(`#expansion-button-${id}`).html('<img src="assets/img/inactive/playlist_tracker_icon_24.png">');
    }
}

function validateYoutube() {
    const regexYT = /^https:\/\/www\.youtube\.com\/playlist\?list=/;
    let url = $('#playlist-url').val();
        
    if(regexYT.test(url)) {
        $('#system').html('');
        $('#playlist-url').removeClass('is-invalid');
        $('#subscription-button').prop('disabled', false);
    } else {
        $('#system').html('this is not a valid playlist url for YouTube');
        $('#playlist-url').addClass('is-invalid');
        $('#subscription-button').prop('disabled', true);
    }
}

async function query(event) {
    event.preventDefault();
    $('#system').html('');
    account.actions += 1;
    try {
        const url = $('#playlist-url').val();
        for(let i = 0; i < account.playlists.length; i++) {
            if(account.playlists[i].playlist_url == url) { new Error('You are already subscribed to this playlist'); }
        }
        $('#subscription-button').prop('disabled', true);
        const response = await axios.post('http://chuadevs.com:12312/v1/api/youtube', { url: url });
        if(response.status === 200) {
            account.playlists.push(response.data);
            localStorage.setItem('abs_account',  JSON.stringify(account));
            const sync = await axios.put('http://chuadevs.com:12312/v1/account/sync', account);
            if(sync.status === 200)
                window.location.href = 'popup.html';
        }
    } catch(e) {
        $('#subscription-button').prop('disabled', false);
        $('#system').html(e.message);
    }
}

function nav() { 
    $('.navbar-nav').html(`
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="account-manager">Account Manager</a>
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
    $('#playlist-view').click(function() { window.location.href = 'popup.html' });
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
    playlistManager();
}

function init() {
    main();
}

$(document).ready(function() { init(); });