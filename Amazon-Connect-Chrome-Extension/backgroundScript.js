let contentPort
chrome.runtime.onConnect.addListener(function(portFrom) {
   if(portFrom.name === 'background-content') {
      //This is how you add listener to a port.
      portFrom.onMessage.addListener(function(message) {
         //alert(JSON.stringify(message, null, 4));
      });
   }
});

chrome.browserAction.onClicked.addListener(function(tab) { 
  chrome.tabs.sendMessage(tab.id, {action: 'TOGGLE_DIV'});
});