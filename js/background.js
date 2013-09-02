
(function() {
    var SOUNDCLOUD_URL_P = "https://soundcloud.com/*";
    var playingTabId = null;

    chrome.runtime.onInstalled.addListener(function(details) {
        chrome.tabs.query({ url: SOUNDCLOUD_URL_P},function(tabs){ 
            for(var i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id); 
            }
        });
    });
    chrome.tabs.onRemoved.addListener(function(tabId,removeInfo) {
        chrome.tabs.query({ url: SOUNDCLOUD_URL_P},function(tabs){ 
            if(playingTabId == null) return;
            var closed = true;
            for(var i = 0; i < tabs.length; i++) {
                if(tabs[i].id == playingTabId) {
                    closed = false;
                    break;
                }
            }
            if(closed == true) {
                chrome.browserAction.setIcon({ path : "images/play.png" });
            }
        });
    });
    chrome.browserAction.onClicked.addListener(function(tab) {
        chrome.tabs.query({ url: SOUNDCLOUD_URL_P},function(tabs){ 
            if(tabs.length <= 0) {
                chrome.tabs.create(
                    { url : "https://soundcloud.com/" , active : true },function(tab) {});
            } else {
                chrome.tabs.sendMessage(tabs[0].id,{ action: "click" });
            }
        });

    });

    //chrome.runtime.sendMessage were introduced in Chrome 28
    //For compatible with chrome 20-25,use chrome.extension.onMessage
    var onMessage = chrome[chrome.runtime && chrome.runtime.onMessage ? 'runtime' : 'extension'].onMessage;
    onMessage.addListener(
        function(request,sender,sendResponse) {
            if(sender.tab && request.action == "click") {
                var playing = request.playing;
                if(playing == true) {
                    chrome.browserAction.setIcon({ path : "images/pause.png" });
                    playingTabId = sender.tab.id;
                }
                else {
                    chrome.browserAction.setIcon({ path : "images/play.png" });
                }
            }
    });

})();
