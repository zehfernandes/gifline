chrome.runtime.onInstalled.addListener(function(details){
  chrome.tabs.query({url:'https://mail.google.com/*'} , function(tab) {
     if (tab.length > 0) {
     	tab.forEach( function(value) {
     		chrome.tabs.reload(value.id);
        	chrome.tabs.executeScript(value.id, {file: "content.js"} );
		});
     }
  });
});
