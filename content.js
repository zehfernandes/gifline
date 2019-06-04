
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


setTimeout(function() { 

    _load("jquery-3.4.1.min.js", function() {
        _load("gmail.js", function() {
            _load("main.js");
        });
    });

},1000)
