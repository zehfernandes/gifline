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

        $('.Ap').on("click", ".gifLine", function(){
            var separator = $("<span />", {
                "class": "a5u",
                "style": "-webkit-user-select: none;"
            }).html("|");

            var element = $("<span />", {
                "class": "Lh",
                "id": "reload-image",
                "style": "-webkit-user-select: none;"
            }).html("Reload Gif");

            element.click({gif: this}, reloadGif);

            $('.a5s').find("#tr_sizes-div").append(separator).append(element);
            //$(this).closest( "table" ).next("");
        });

    });

    function reloadGif(event) {
      var keyword = $(event.data.gif).attr("title");

      $.ajax({
          url: 'https://tv.giphy.com/v1/gifs/random?api_key=xTiTnvpvz9ucREOFRS&tag='+keyword,
          cache: false
        }).done(function( obj ) {

          var data = obj.data.image_url;
          data = data.replace("http://", "https://");
          var string = '<img src = "'+data+'" class="gifLine"  title="'+keyword+'">';

          //$(event.data.gif).attr("src", data);
          var composes = gmail.dom.composes();
          $.each(composes, function(key,email){
            var t = $(event.data.gif).map(function() { return this.outerHTML; }).get().join("");

            body = email.body().replace(t, string);
            email.body(body);

            $("body").find("#default-resize-image").trigger("click");

          });

      });
    }

    function doneTyping() {

        var composes = gmail.dom.composes();
        $.each(composes, function(key,email){

            var body = email.body();
            var commandLine = body.match(/(\/|::)gif(me| me)? ([\w\??| ]+)/i);

            if (commandLine != null) {
              var keyword = commandLine[3].replace(" ", "+");
              var replace = commandLine[0];
              var string;

              $.ajax({
                url: 'https://tv.giphy.com/v1/gifs/random?api_key=xTiTnvpvz9ucREOFRS&tag='+keyword,
                cache: false
              }).done(function( obj ) {
                  var data = obj.data.image_url;
                  data = data.replace("http://", "https://");

                  if (data) {
                    string = '<img src = "'+data+'" class="gifLine"  title="'+keyword+'">';
                  } else {
                    string = '<em>I can\'t find any GIF with this reaction.</em>';
                  }

                  body = body.replace(replace, string);
                  email.body(body);

              });

            }

        });
    }
}


refresh(main);
