
var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.remove();
};

try {
	var mainDiv = document.createElement('div');
	mainDiv.id = 'divConnectId';
	mainDiv.style.position = 'absolute';
	//mainDiv.style.top = 0;
	mainDiv.style.left = "340px";
	document.body.appendChild(mainDiv);
	document.getElementById("divConnectId").classList.add("row");

	var headerDiv = document.createElement('div');
	headerDiv.id = 'divConnectHeader';
	headerDiv.innerHTML = "Click to move";
	mainDiv.appendChild(headerDiv);

	var txtbox = document.createElement('input');	
	txtbox.id = 'txtContactId';
	txtbox.style.width = "250px";
	txtbox.value = 'Contact Id';
	mainDiv.appendChild(txtbox);

	var btn = document.createElement('input');	
	btn.type = 'button';
	btn.value = 'Copy Text';
	btn.id = 'btnCopyContactId';
	mainDiv.appendChild(btn);
}
catch(err) {
    console.log("ERROR:", err);
} 

// Event listener
document.addEventListener('RW759_connectExtension', function(e) {
    // e.detail contains the transferred data (can be anything, ranging
    // from JavaScript objects to strings).
    // Do something, for example:
    console.log("DEBUG:", e.detail);
    document.getElementById("txtContactId").value = e.detail;
});

let contentPort = chrome.runtime.connect({
   name: 'background-content'
});

//Listen for runtime message
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
   if(message.action === 'TOGGLE_DIV') {

	var x = document.getElementById("divConnectId");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

	contentPort.postMessage({
	     type: 'DIV_STATUS', 
	     payload: {
	        displayValue: x.style.display
	     }
	});

   }
});
