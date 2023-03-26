const registerURL = "registerURL";
const loginURL = "loginURL";

const account = {
    email: 'jon.chua51@gmail.com',
    playlists: [
        { playlist_title: "The Code Report", plid: "PL0vfts4VzfNjnYhJMfTulea5McZbQLM7G", videos: [
            {
                title: "How a CS student tracks Elon’s Private Jet with Python // The Code Report",
                url: "https://www.youtube.com/watch?v=bJUl3OAIT0k",
                watched: false
            },
            {
                title: "BIG new feature lands in Node.js // The Code Report",
                url: "https://www.youtube.com/watch?v=MBqS1kYzwTc",
                watched: false
            },
            {
                title: "What happens if you hack 4.5 billion BTC? // The Code Report",
                url: "https://www.youtube.com/watch?v=KPyeJ5J2a7A",
                watched: false
            },
            {
                title: "The Shocking State of JavaScript // The Code Report",
                url: "https://www.youtube.com/watch?v=1L2hrG-7i2Y",
                watched: false
            },
            {
                title: "I feel cyber attacked // The Code Report",
                url: "https://www.youtube.com/watch?v=3OqQhtLwY9o",
                watched: false
            },
            {
                title: "A heroic new proposal for JavaScript // The Code Report",
                url: "https://www.youtube.com/watch?v=O9F4K804XC8",
                watched: false
            },
            {
                title: "Time… a programmer's worst enemy // The Code Report",
                url: "https://www.youtube.com/watch?v=iMVgvkVJuDI",
                watched: false
            },
            {
                title: "I use Arch on an M1 MacBook, btw",
                url: "https://www.youtube.com/watch?v=j_I9nkpovCQ",
                watched: false
            },
            {
                title: "DALL-E is coming... World-changing AI image generator",
                url: "https://www.youtube.com/watch?v=alJdw4JDJ4o",
                watched: false
            },
            {
                title: "The Nuxt big thing in web development?",
                url: "https://www.youtube.com/watch?v=noq-ZHTD2Cg",
                watched: false
            },
            {
                title: "Is the tech bubble bursting right now?",
                url: "https://www.youtube.com/watch?v=g-_hVXzkn0o",
                watched: false
            },
            {
                title: "Web5... The Web3 Killer?",
                url: "https://www.youtube.com/watch?v=HDZWWFSZUF0",
                watched: false
            },
            {
                title: "a fresh new web framework is out",
                url: "https://www.youtube.com/watch?v=4boXExbbGCk",
                watched: false
            },
            {
                title: "JavaScript just got way faster",
                url: "https://www.youtube.com/watch?v=FMhScnY0dME",
                watched: false
            },
            {
                title: "Carbon Lang… The C++ killer?",
                url: "https://www.youtube.com/watch?v=-bHK0qmp06c",
                watched: false
            },
            {
                title: "Astro just Launched.... Could it be the ultimate web framework?",
                url: "https://www.youtube.com/watch?v=gxBkghlglTg",
                watched: false
            },
            {
                title: "There ain't no such thing as a \"free\" tier",
                url: "https://www.youtube.com/watch?v=ciF7WZXmpjU",
                watched: false
            },
            {
                title: "PocketBase... The Ultimate Side-Hustle Backend?",
                url: "https://www.youtube.com/watch?v=Wqy3PBEglXQ",
                watched: false
            },
            {
                title: "Qwik… the world's first O(1) JavaScript framework?",
                url: "https://www.youtube.com/watch?v=x2eF3YLiNhY",
                watched: false
            },
            {
                title: "Stop calling Fleet a VS Code Killer",
                url: "https://www.youtube.com/watch?v=h55emgImrLk",
                watched: false
            },
            {
                title: "Next.js 13… this changes everything",
                url: "https://www.youtube.com/watch?v=_w0Ikk4JY7U",
                watched: false
            },
            {
                title: "When your JavaScript framework gets acquired",
                url: "https://www.youtube.com/watch?v=HleppfVh8jc",
                watched: false
            },
            {
                title: "Is FAANG f**ked?",
                url: "https://www.youtube.com/watch?v=2pfcynxODJc",
                watched: false
            },
            {
                title: "a solid start",
                url: "https://www.youtube.com/watch?v=DVWu2b7mvFg",
                watched: false
            },
            {
                title: "What will AI Programming look like in 5 Years?",
                url: "https://www.youtube.com/watch?v=eaedq1Jl2fc",
                watched: false
            },
            {
                title: "SvelteKit is my mistress",
                url: "https://www.youtube.com/watch?v=uEJ-Rnm2yOE",
                watched: false
            },
            {
                title: "Reverse Engineering Logan Paul's Scam",
                url: "https://www.youtube.com/watch?v=NGXW4xhlYa4",
                watched: false
            },
            {
                title: "The Official JavaScript Tier List is Here",
                url: "https://www.youtube.com/watch?v=vdiYtiKD8eI",
                watched: false
            },
            {
                title: "Tailwind CSS is the worst…",
                url: "https://www.youtube.com/watch?v=lHZwlzOUOZ4",
                watched: false
            },
            {
                title: "The weird future of music",
                url: "https://www.youtube.com/watch?v=1LV1K69885E",
                watched: false
            },
            {
                title: "ChatGPT is a perfectly balanced AI with no exploits",
                url: "https://www.youtube.com/watch?v=y3iLOxBTuy4",
                watched: false
            },
            {
                title: "Silicon Valley had a bank... HAD",
                url: "https://www.youtube.com/watch?v=nMdwS3A6zck",
                watched: false
            },
            {
                title: "GPT-4 has been unleashed",
                url: "https://www.youtube.com/watch?v=EunbKbPV2C0",
                watched: false
            },
            {
                title: "Midjourney 5 must be stopped at all costs",
                url: "https://www.youtube.com/watch?v=nYqeHIRKboM",
                watched: false
            },
            {
                title: "Google Bard… the ChatGPT killer?",
                url: "https://www.youtube.com/watch?v=xW9DJTvB3NI",
                watched: false
            },
            {
                title: "Game over… GitHub Copilot X announced",
                url: "https://www.youtube.com/watch?v=q1HZj40ZQrM",
                watched: false
            },
            {
                title: "ChatGPT gets another insane new buff",
                url: "https://www.youtube.com/watch?v=mpnh1YTT66w",
                watched: false
            }
        ]},
        { playlist_title: "Survival Logic", plid:"", videos: [
            {
                title: "Survival Logic Trailer",
                url: "https://www.youtube.com/watch?v=qip-dyjIj4s",
                watched: false
            },
            {
                title: "First day playing a survival game",
                url: "https://www.youtube.com/watch?v=XRBE1z8qvSc",
                watched: false
            },
            {
                title: "Crafting your first item in a survival game",
                url: "https://www.youtube.com/watch?v=W0nRSmZ2UXo",
                watched: false
            },
            {
                title: "Tedious health meters in survival games",
                url: "https://www.youtube.com/watch?v=7Gg9iQHfV5A",
                watched: false
            }
        ]}
    ]
};

function register() {
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
            <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password">
            <label for="confirmPassword">Confirm Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" id="signup" type="submit">Register</button>
        <div class="container">
            <span class="container-fluid py-2">
                Already have an account? <a href="login.html" id="login">Log In</a>
            </span>
        </div>
        <p class="mt-5 mb-3 text-muted">© A Better Subscription 2023</p>
    `);

    $('form').submit(function(event) {
        event.preventDefault();
        let data = { email: $('#email').val(), password: $('#password').val() }
        console.log(`http post to: ${registerURL} with ${JSON.stringify(data)}`);
        /*
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Code to handle the response data
            console.log(data);
        })
        .catch(error => {
            // Code to handle errors
            console.error(error);
        }); */
    });
}

function login(event) {
    event.preventDefault();
    if($('#email').val() === 'demo@demo.demo') {
        localStorage.setItem('abs_account', JSON.stringify(account));
        window.location.href = 'popup.html';
    } else { }
    
    let data = { email: $('#email').val(), password: $('#password').val() }
    console.log(`http post to: ${loginURL} with ${JSON.stringify(data)}`);
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Code to handle the response data
        console.log(data);
    })
    .catch(error => {
        // Code to handle errors
        console.error(error);
    });
}

function init() {
    $('.register').click(register);
    $('#signin').click(login);
}

$(document).ready(function() { init(); });