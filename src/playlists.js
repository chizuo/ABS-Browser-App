const account = JSON.parse(localStorage.getItem('abs_account'));
var popupFocus = true;

function playlistOptions() {
    $('#app').html(`<br><br><center>
        <div class="btn-group mr-1" role="group" aria-label="Button group with four buttons">
            <button type="button" class="btn btn-secondary border" id="subscribe-button">Subscribe</button>
            <button type="button" class="btn btn-secondary border" data-bs-toggle="tooltip" data-bs-placement="top" title="this feaure coming soon!" id="changelog-button">Playlist change logs</button>
            <button type="button" class="btn btn-secondary border" id="playlists-button">Manage my playlists</button>
            <button type="button" class="btn btn-secondary border" id="content-button">Manage playlist contents</button>
        </div>
    </center>`);
    footer();
    $('#subscribe-button').click(subscribe);
    $('#playlists-button').click(playlistManager);
    $('#content-button').click(contentManager);
    $('[data-bs-toggle="tooltip"]').tooltip();
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
    footer();
    $('#subscription-button').click(query);
    $('#subscription-button').prop('disabled', true);
    $('#playlist-url').on('input', validateYoutube);
}

function playlistManager() {
    $('#app').empty();
    for(let i = 0; i < account.playlists.length; i++) {            
        $('#app').append(`<div class="bg-secondary text-bg-secondary border-top border-bottom title-bar py-1" index="${i}">
            <span class="expansion-button" id="expansion-button-${i}" index="${i}"><img src="assets/img/inactive/playlist_tracker_icon_24.png"></span> 
            <span class="mx-1" id="playlist-title${i}">${account.playlists[i].playlist_title}</span>
            <span class="playlist-menu" index="${i}"><img src="assets/img/option-icon.jpg" class="options-icon" ></span>
            <span class="popup-menu btn-group" id="popup-menu${i}">
                <button class="rename btn btn-secondary border" type="button" index="${i}">Rename</button>
                <button class="unsubscribe btn btn-secondary border" type="button" index="${i}">Unsubscribe</button>
            </span>
        </div>`);
    }
    footer();
    $('.popup-menu').hide();
    $('.playlist-menu').click(playlistMenu);
    $('.unsubscribe').click(unsubscribe);
    $('.rename').click(rename);
}

function rename() {
    let id = $(this).attr('index');
    let DOMplaylist = $(`#playlist-title${id}`);
    let DOMpopup = $(`#popup-menu${id}`);
    let title = DOMplaylist.text();

    DOMplaylist.data('prev', DOMplaylist.clone());
    DOMpopup.data('prev', DOMpopup.clone());

    DOMplaylist.html(`<input type="text" name="title" class="input-lg border rounded" id="title-input${id}" value="${title}">`);
    DOMpopup.html(`
        <button class="btn btn-secondary border" type="button" id="update">Update</button>
        <button class="btn btn-secondary border" type="button" id="cancel">Cancel</button>
    `);

    $(`#title-input${id}`).on('focus', () => { 
        popupFocus = false;
        $(`#popup-menu${id}`).show(); 
    });

    $('#update').click(() => {
        let value = $(`#title-input${id}`).val();
        if(title === value) {
            DOMplaylist.html(DOMplaylist.data('prev'));
            DOMpopup.html(DOMpopup.data('prev'));
            popupFocus = true;
            $(`#popup-menu${id}`).hide(); 
        } else {
            account.actions += 1;
            account.playlists[id].playlist_title = value;
            update("playlistManager");
        }
    });

    $('#cancel').click(() => {
        DOMplaylist.html(DOMplaylist.data('prev'));
        DOMpopup.html(DOMpopup.data('prev'));
        popupFocus = true;
        $(`#popup-menu${id}`).hide(); 
    });
}

function unsubscribe() {
    let id = $(this).attr('index');
    account.actions += 1;
    $('.btn').prop('disabled', true);
    account.playlists.splice(id, 1);
    update("playlistManager");
}

function update(load) {
    chrome.storage.local.set({'abs_newData': true}, () => { 
        localStorage.setItem('abs_account', JSON.stringify(account));
        chrome.storage.local.set({'abs_account': account}, () => {
            if(load === "contentManager") contentManager();
            else if(load === "playlistManager") playlistManager();
            else if(load === "menu") window.location.href = "playlists.html";
            else window.location.href = "popup.html"; 
        });
    });
}

function playlistMenu() {
    let id = $(this).attr('index');
    if($(`#popup-menu${id}`).is(':hidden')) {
        $('.popup-menu').hide();
        $(`#popup-menu${id}`).show();
    } else {
        $(`#popup-menu${id}`).hide();
    }
}

function contentManager() {
    $('#app').html(`<center>
    <div class="btn-group mr-1" role="group" aria-label="Button group with three buttons">
        <button type="button" class="btn btn-primary content-manager border" value="watch">Watched</button>
        <button type="button" class="btn btn-primary content-manager border" value="unwatch">Unwatched</button>
        <button type="button" class="btn btn-primary content-manager border" value="delete">Delete</button>
    </div>
    </center>`);
    for(let i = 0; i < account.playlists.length; i++) {            
        let { playlist_title, contents }  = account.playlists[i];
        $('#app').append(`<div class="bg-secondary text-bg-secondary p-1 border-top border-bottom title-bar" index="${i}">
            <span class="expansion-button" id="expansion-button-${i}" index="${i}"><img src="assets/img/active/playlist_tracker_icon_24.png"></span> 
            <span class="mx-1">${playlist_title} (size: ${contents.length})</span>
        </div>
        <ul class="playlist" id="playlist-${i}"></ul>`);
        for(let j = 0; j < contents.length; j++) {
            let value = JSON.stringify({playlist:i, content:j});
            $(`#playlist-${i}`).append(`<li><input type="checkbox" class="playlist-entry" value=${value} id="playlist-entry${j}" name="playlist-entry${j}">
            <label class="checkbox-label" for="playlist-entry${j}">${contents[j].title}</label></li>`);
        }
    }
    footer();
    $('.expansion-button').click(hide);
    $('.content-manager').click(markSelected);
}

function markSelected() {
    const selected = $('input[type="checkbox"]:checked');
    const command = $(this).val();
    account.actions += 1;
    if(selected.length > 0) {
        selected.each(function() {
            const { playlist, content} = JSON.parse($(this).val());
            account.playlists[playlist].clicked += 1;
            if(command === "watch") account.playlists[playlist].contents[content].viewed = true;
            else if (command === "unwatch") account.playlists[playlist].contents[content].viewed = false;
            else if (command === "delete") account.playlists[playlist].contents.splice(content, 1);
            else console.log('command error');
        });
        if(command === "delete") update("contentManager");
        else update("menu");
    } else {
        window.location.href = "popup.html";
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
            if(account.playlists[i].playlist_url == url) { throw new Error('You are already subscribed to this playlist'); }
        }
        $('#subscription-button').prop('disabled', true);
        const response = await axios.post('http://chuadevs.com:12312/v1/api/youtube', { url: url });
        account.playlists.push(response.data);
        update("playlist");
    } catch(e) {
        $('#subscription-button').prop('disabled', false);
        $('#system').html(e.response.data.error.message);
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
    $('#playlist-view').click(() => window.location.href = 'popup.html');
    $('#account-manager').click(() => window.location.href = 'account.html');
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
    playlistOptions();
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

$(document).click(function(e) {
    if (!$(e.target).closest('.playlist-menu').length && !$(e.target).closest('.popup-menu').length && popupFocus === true) {
      $('.popup-menu').hide();
    }
});

$(document).ready(function() { init(); });