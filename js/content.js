(function() {
    var playingEl = "playing";
    var playing = false;
    var $playButton = $("button.playControl")

    var watchPlayButton = function() {
        var $this = $(this);
        var _playing = false;
        if($this.hasClass(playingEl)) {
            _playing = true;
        }
        if(playing != _playing) {
            playing = _playing;
            chrome.runtime.sendMessage({action : "click" , "playing" : playing});
        }
    };

    $playButton.watch("className",watchPlayButton);

    var clickPlayButton = function() {
        $playButton.click();
    }

    chrome.runtime.onMessage.addListener(
        function(request,sender,sendResponse) {
            if(request.action == "click") {
                clickPlayButton();
            } 
        }
    );

})();
