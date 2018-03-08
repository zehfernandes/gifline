var postInstall = function() {
      chrome.tabs.query({url:'https://mail.google.com/*'} , function(tab) {
         if (tab.length > 0) {
         	tab.forEach( function(value) {
         		chrome.tabs.reload(value.id);
            	chrome.tabs.executeScript(value.id, {file: "content.js"} );
    		});
         }
      });
}

if (chrome && chrome.runtime && chrome.runtime.onInstalled) {
    chrome.runtime.onInstalled.addListener(postInstall);
} else {
    // might be a better way... for now, it works. Will update if I can find something better
    postInstall();
}
