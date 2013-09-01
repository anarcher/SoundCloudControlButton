
(function() {
    var SOUNDCLOUD_URL_P = "https://soundcloud.com/*";
    chrome.runtime.onInstalled.addListener(function(details) {
        chrome.tabs.query({ url: SOUNDCLOUD_URL_P},function(tabs){ 
            for(var i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id); 
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
    chrome.runtime.onMessage.addListener(
        function(request,sender,sendResponse) {
            if(sender.tab && request.action == "click") {
                var playing = request.playing;
                if(playing == true) {
                    chrome.browserAction.setIcon({ path : "images/pause.png" });
                }
                else {
                    chrome.browserAction.setIcon({ path : "images/play.png" });
                }
            }
    });
})();
