(function() {
    var playingEl = "playing";
    var playing = false;
    var $playButton = $("button.playControl")

    //chrome.runtime.sendMessage were introduced in Chrome 28
    //For compatible with chrome 20-25,use chrome.extension.onMessage
    var sendMessage = chrome[chrome.runtime && chrome.runtime.sendMessage ? 'runtime' : 'extension' ].sendMessage; 

    var watchPlayButton = function() {
        var $this = $(this);
        var _playing = false;
        if($this.hasClass(playingEl)) {
            _playing = true;
        }
        if(playing != _playing) {
            playing = _playing;
            sendMessage({action : "click" , "playing" : playing});
        }
    };

    $playButton.watch("className",watchPlayButton);

    var clickPlayButton = function() {
        $playButton.click();
    }
    //chrome.runtime.sendMessage were introduced in Chrome 28
    //For compatible with chrome 20-25,use chrome.extension.onMessage
    var onMessage = chrome[chrome.runtime && chrome.runtime.onMessage ? 'runtime' : 'extension'].onMessage;
    onMessage.addListener(
        function(request,sender,sendResponse) {
            if(request.action == "click") {
                clickPlayButton();
            } 
        }
    );

})();
