const account = JSON.parse(localStorage.getItem('abs_account'));
//chrome.storage.local.get('abs_account', function(result) { account = result.abs_account; });

function playlist() {
    console.log('building playlist');
    if(account.playlists.length === 0) {
        $('#popup-body').html(`
            <div class="container p-5 text-center">
                Your account does not have any playlists it is subscribed to. Navigate to the playlist manager to subscribe to one.
            </div>
        `);
    } else {
        for(let i = 0; i < account.playlists.length; i++) {            
            let { playlist_title, contents }  = account.playlists[i];
            $('#popup-body').append(`<div class="bg-secondary text-bg-secondary p-1 border-top border-bottom title-bar" index="${i}">
                <span class="expansion-button" id="expansion-button-${i}" index="${i}"><img src="assets/img/active/playlist_tracker_icon_24.png"></span> ${playlist_title}
            </div>
            <ul class="playlist" id="playlist-${i}"></ul>`);
            for(let j = 0; j < contents.length; j++) {
                if(!contents[j].viewed)
                    $(`#playlist-${i}`).append(`<li><a href="${contents[j].url}" class="playlist-entry" target="_blank" playlist="${i}" content="${j}">${contents[j].title}</a></li>`);
            }
        }
        $('.expansion-button').click(hide);
        $('.playlist-entry').click(viewed); 
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

async function viewed(e) {
    e.preventDefault();
    let url = $(this).attr('href');
    let playlist = $(this).attr('playlist');
    let content = $(this).attr('content');
    account.playlists[playlist].contents[content].viewed = true;
    account.playlists[playlist].clicked += 1;
    account.actions += 1;
    localStorage.setItem('abs_account', JSON.stringify(account));
    $(this).hide();
    window.open(url)
}

async function logoff() {
    try {
        await axios.put('http://chuadevs.com:12312/v1/account/sync', account);
        localStorage.removeItem('abs_account');
        await chrome.storage.local.remove('abs_account', () => { location.reload(); })
    } catch(e) {
        $('#system').html(e.message);
    }
}

async function init() {
    if(account) {
        $('.navbar-nav').html(`
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="account-options">Account Options</a>
            </li>
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="playlist-options">Playlist Options</a>
            </li>
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="log-off">Log off</a>
            </li>
        `);
        await chrome.storage.local.set({ "abs_account": account });
        $('#log-off').click(logoff);
        $('#playlist-options').click(function() { window.location.href = 'playlists.html' });
        chrome.storage.local.get('abs_newData', function(result) {
            if(result.abs_newData !== undefined) {
                localStorage.setItem('abs_account', JSON.stringify(result.abs_newData));
                chrome.storage.local.remove('abs_newData', () => { 
                    try {
                        axios.put('http://chuadevs.com:12312/v1/account.sync', account);
                        location.reload();
                    } catch(e) {
                        console.log(e.message);
                    }
                });
            } else {
                console.log(`nothing to delete`);
                playlist();
            }
            
        });
        
    } else {
        $('.navbar-nav').html(`
            <li class="nav-item ms-auto">
              <a class="nav-link active" aria-current="page" href="login.html">Login</a>
            </li>
        `);
        $('#popup-body').html(`
            <h3 id="account-warning">An account is required to use this extension and all of its features</h3>
            <div class="p-3">
                <a href="login.html" class="btn btn-secondary">Login</a>
            </div>
        `);
        window.location.href = 'login.html'
    }
}

$(document).ready(function() { init(); });