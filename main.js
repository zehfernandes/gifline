var gmail;

function refresh(f) {
  if( (/in/.test(document.readyState)) || (undefined === Gmail) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var main = function(){

    var typingTimer;
    gmail = new Gmail();

    //Register events if composes are open
    gmail.observe.on("compose", function(compose, type) {

        $('.Ap').on("keyup", function(){
            window.clearTimeout(typingTimer);
            typingTimer = window.setTimeout(doneTyping , 1000);
        });

        $('.Ap').on("keydown", function(){
            window.clearTimeout(typingTimer);
        });

    });

    function doneTyping() {

        var composes = gmail.dom.composes();

        $.each(composes, function(key,email){

            var body = email.body();
            var commandLine = body.match(/::gif me ([\w\??| ]+)/i);

            if (commandLine != null) {

              var request = new XMLHttpRequest;
              //request.open('GET', 'https://api.giphy.com/v1/gifs/random?api_key=xTiTnvpvz9ucREOFRS&tag='+commandLine[1], true); Old random
              request.open('GET', ' https://tv.giphy.com/v1/gifs/random?api_key=xTiTnvpvz9ucREOFRS&tag='+commandLine[1], true);
              request.onload = function() {
                  if (request.status >= 200 && request.status < 400){

                    var data = JSON.parse(request.responseText).data.image_url;
                    var string;
                    var replace = commandLine[0];

                      if (data) {
                          data = data.replace("http://", "https://");
                          string = '<img src = "'+data+'"  title="GIF via Giphy">';
                      } else {
                          string = '<em>I can\'t find any GIF with this reaction.';
                      }

                      body = body.replace(replace, string);
                      email.body(body);
                  } else {
                    console.log('reached giphy, but API returned an error');
                  }
              };

              request.onerror = function() {
                  console.log('connection error');
              };

              request.send();
            }

        });

    }
}


refresh(main);
