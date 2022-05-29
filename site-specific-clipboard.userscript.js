// ==UserScript==
// @name         Site specific clipboard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A simple userscript that gives you a textarea you can write on that will persist when you go back to that website
// @author       albert@addteam.org
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const contentKey = 'siteClipboard_content';

    let body = document.body;
    let textAreaWrapper = document.createElement("div");
    textAreaWrapper.style = "position:fixed; top:0; right:0;background:#eee;height:450px;width:300px;z-index:9999999999999999;";
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
})();