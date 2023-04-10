// background service of the extension that checks the subscribed playlists of the account at some set interval
var account;
chrome.storage.local.get('abs_account', function(result) { account = result.abs_account; });

const playlist = {
  url: "https://www.youtube.com/playlist?list=PLSMETuURtTXClX140WdPx9LX8dQts6c1x",
  plid: "PLSMETuURtTXClX140WdPx9LX8dQts6c1x",
  contents: [
          {
              title: "Survival Logic Trailer",
              url: "https://www.youtube.com/watch?v=qip-dyjIj4s",
              viewed: false
          },
          {
              title: "First day playing a survival game",
              url: "https://www.youtube.com/watch?v=XRBE1z8qvSc",
              viewed: false
          },
          {
              title: "Crafting your first item in a survival game",
              url: "https://www.youtube.com/watch?v=W0nRSmZ2UXo",
              viewed: false
          },
          {
              title: "Tedious health meters in survival games",
              url: "https://www.youtube.com/watch?v=7Gg9iQHfV5A",
              viewed: false
          }
      ]
}

function checkSubscriptions() {
  let newContent = false;
  for(let i = 0; i < account.playlists.length; i++) {
    fetch('http://chuadevs.com:12312/v1/api/youtube', {
      method: "PUT",
      body:JSON.stringify(account.playlists[i]),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(response.status === 200) return response.json();
      else if(response.status === 204) return;
      else throw new Error(`status:${response.status}, message:${response.statusText}`);
    }).then(data => {
      if(data) {
        newContent = true;
        for(let j = 0; j < data.length; j++) {
          account.playlists[i].contents.push(data[j]);
        }
      }
    }).catch(error => console.error(`${new Date().toLocaleTimeString()} : ${account.email} : ${error}`)); 
  }

  if(newContent) {
    chrome.storage.local.set({ "abs_account": account }, () => {
      chrome.storage.local.set({ 'abs_newData' : account }, () => {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: '../assets/img/active/playlist_tracker_icon_128.png',
          title: 'A Better Subscription Service',
          message: `You have new content to view`
        });
      });
    });
  } else {
    chrome.storage.local.get('abs_fetchLog', result => {
      let log = result.abs_fetchLog;
      let msg = 'checked subscriptions, no new content'
      if(log !== undefined)
        log.push(`${new Date().toLocaleTimeString()} : ${msg}`);
      else
        log = [`${new Date().toLocaleTimeString()} : ${msg}`];
      chrome.storage.local.set({'abs_fetchLog': log});
    });
  }
}

chrome.alarms.create("checkSubscriptions", { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener( alarm => {
  if (alarm.name === "checkSubscriptions") {
    chrome.storage.local.get('abs_account', result => { 
      account = result.abs_account; 
      if(account !== undefined)
        checkSubscriptions();
      else
        console.error(`${new Date().toLocaleTimeString()} : account is undefined`);
    });
  }
});

