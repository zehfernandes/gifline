
var _load = function(script, callback) {
    script = chrome.extension.getURL(script);
    var scr = document.createElement("script");
    scr.src = script;
    if (callback) {
        if (scr.addEventListener) {
            scr.addEventListener("load", callback);
        } else {
            scr.onload = callback;
        }
    }
    (document.head || document.documentElement).appendChild(scr);
}

_load("jquery-1.10.2.min.js", function() {
    _load("gmail.js", function() {
        _load("main.js");
    });
});
