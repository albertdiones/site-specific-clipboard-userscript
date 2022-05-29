// ==UserScript==
// @name         Site specific clipboard
// @namespace    http://tampermonkey.net/
// @version      0.1.4
// @description  A simple userscript that gives you a textarea you can write on that will persist when you go back to that website
// @author       albert@addteam.org
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @updateUrl https://raw.githubusercontent.com/albertdiones/site-specific-clipboard-userscript/master/site-specific-clipboard.userscript.js
// @downloadUrl https://raw.githubusercontent.com/albertdiones/site-specific-clipboard-userscript/master/site-specific-clipboard.userscript.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const contentKey = 'siteClipboard_content';

    let body = document.body;
    let textAreaWrapper = document.createElement("div");
    textAreaWrapper.style = "position:fixed; top:0; right:0;background:#eee;height:450px;width:400px;z-index:9999999999999999; opacity:0.95;";
    textAreaWrapper.innerHTML = "<b>Site Clipboard</b><textarea></textarea>"
    body.appendChild(textAreaWrapper);
    let textArea = textAreaWrapper.querySelector("textarea");


    textArea.style="width:100%;height:85%;";


    // set the content from the previous localStorage contents
    let previousContent = localStorage.getItem(contentKey)
    if (previousContent !== null) {
        textArea.innerHTML = previousContent;
    }

    textArea.addEventListener("keyup", function(e) {
        // save the contents of the clipboard
        localStorage.setItem(contentKey, textArea.value);
    }
    );

    // block CTRL S  https://stackoverflow.com/questions/11000826/ctrls-preventdefault-in-chrome
    textArea.addEventListener("keydown", function(e) {
        // todo: change the e.which to e.key https://stackoverflow.com/questions/49278648/alternative-for-events-deprecated-keyboardevent-which-property
        if(e.ctrlKey && (e.which == 83)) {
            e.preventDefault();
            return false;
        }
    }
    );
})();