// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

(function(console){

  console.save = function(data, filename){

    if(!data) {
      console.error('Console.save: No data')
      return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
      data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console);



document.addEventListener('DOMContentLoaded', documentEvents  , false);

function myAction(input) {

  runScript(input.value);
}

function documentEvents() {
  document.getElementById('ok_btn').addEventListener('click',
      function() {
          if (document.getElementById('name_textbox').value.length<5){
            alert('List name is required');
            return false;
          }
    myAction(document.getElementById('name_textbox'));
      });

  // you can add listeners for other objects ( like other buttons ) here
}


function runScript(listName){

  var ln = listName;
  chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function(tabs) {
        const { id: tabId } = tabs[0].url;
        let theURl = tabs[0].url;
        if (theURl.includes("crowdtangle.com")===false){
          alert('This plugin only works on crowdtangle pages');
          return;
        }
        let  code = `(function getPRId() {
      dd = [];

      if (document.getElementsByClassName('instagram').length===0){
      var kk = document.querySelectorAll("a.go-to-post").forEach(function(x){ dd.push(x.getAttribute('href').split('/posts/')[0].split('permalink')[0]);  });
      var output = [...new Set(dd)];
      }
      else {
        var zz = document.querySelectorAll("div.instagram-list-content > h3 > strong > a").forEach(function(x) { dd.push('https://www.instagram.com/'+x.innerText); });
        uniqueset = new Set(dd);
        var output = [...uniqueset];
        

      }
      var text = 'Page or Account URL,List'+"\\n";
      var i;
      for (i = 0; i < output.length; i++) { 
        text += output[i] + ',${ln}'+"\\n";
      }
      return text;
  })()`;

        // http://infoheap.com/chrome-extension-tutorial-access-dom/
        chrome.tabs.executeScript(tabId, { code }, function (result) {

          console.save(result[0],'upload_to_ct.csv');
        });
      }
  );


}



//document.querySelectorAll("a.go-to-post").forEach(function(x){ output.push(x.getAttribute('href').split('/posts/')[0]);  })
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

(function(console){

  console.save = function(data, filename){

    if(!data) {
      console.error('Console.save: No data')
      return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
      data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
  }
})(console);

