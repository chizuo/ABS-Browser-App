const account = JSON.parse(localStorage.getItem('abs_account'));

function playlist() {
    if(account.playlists.length === 0) {
        console.log('playlist is empty');
        $('#popup-body').html(`
            <p>Subscribe to a playlist</p>
        `);
    } else {
        for(let i = 0; i < account.playlists.length; i++) {            
            let { title, playlist }  = account.playlists[i];
            $('#popup-body').append(`<div class="bg-secondary text-bg-secondary p-1 title-bar" index="${i}">${title}</div><ul class="playlist" id="${i}"></ul>`);
            for(let j = 0; j < playlist.length; j++) {
                if(!playlist[j].watched)
                    $(`#${i}`).append(`<li><a href="${playlist[j].url}" class="playlist-entry" target="_blank" playlist="${i}" video="${j}">${playlist[j].title}</a></li>`);
            }
        }

        $('.title-bar').click(function() {
            let id = $(this).attr('index');
            if($(`#${id}`).is(':hidden'))
                $(`#${id}`).show();
            else
                $(`#${id}`).hide();
        });

        $('.playlist-entry').click(e => {
            e.preventDefault();
            let url = $(e.currentTarget).attr('href');
            let playlist = $(e.currentTarget).attr('playlist');
            let video = $(e.currentTarget).attr('video');
            account.playlists[playlist].playlist[video].watched = true;
            localStorage.setItem('abs_account', JSON.stringify(account));
            $(e.currentTarget).hide();
            //console.log(`title: ${account.playlists[playlist].playlist[video].title} \nurl:${account.playlists[playlist].playlist[video].url} \nwatched:${account.playlists[playlist].playlist[video].watched}`);
            window.open(url)
        }); 
    }
}

function init() {
    if(account !== null) {
        $('.navbar-nav').html(`
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="account-options">Account Options</a>
            </li>
            <li class="nav-item ms-auto">
                <a class="nav-link" href="#" id="playlist-options">Playlist Options</a>
            </li>
        `);
        playlist();
    } else {
        $('.navbar-nav').html(`
            <li class="nav-item ms-auto">
              <a class="nav-link active" aria-current="page" href="login.html">Login</a>
            </li>
        `);
        $('#popup-body').html(`
            <p>An account is required to use this extension and all of its features</p>
        `);
    }
}

$(document).ready(function() { init(); });