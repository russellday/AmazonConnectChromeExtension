
function copyContactId() {
  /* Get the text field */
  var copyText = document.getElementById("txtContactId");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}

function addListener(element, eventName, handler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, handler, false);
  }
  else if (element.attachEvent) {
    element.attachEvent('on' + eventName, handler);
  }
  else {
    element['on' + eventName] = handler;
  }
}

function addCss(rule) {
  var css = document.createElement('style');
  css.type = 'text/css';
  if (css.styleSheet) css.styleSheet.cssText = rule; // Support for IE
  else css.appendChild(document.createTextNode(rule)); // Support for the rest
  document.getElementsByTagName("head")[0].appendChild(css);
}

addListener(document.getElementById('btnCopyContactId'), 'click', copyContactId);

// CSS rules
var rule  = '.row {width: 100%;text-align: center;}';
    rule += '.block {width: 100px;display: inline-block;zoom: 1;}';

// Load the rules and execute after the DOM loads
window.onload = function() {addCss(rule)};

setInterval(function() {
    /* Example: Send data from the page to your Chrome extension */
    if (typeof connect !== 'undefined'){
	    if (typeof connect.core.getAgentDataProvider().getAgentData() !== 'undefined'){
	    	if (typeof connect.core.getAgentDataProvider().getAgentData().snapshot !== 'undefined'){
	    		if (typeof connect.core.getAgentDataProvider().getAgentData().snapshot.contacts[0] !== 'undefined'){
				    document.dispatchEvent(new CustomEvent('RW759_connectExtension', {
			        	detail: connect.core.getAgentDataProvider().getAgentData().snapshot.contacts[0].contactId
			    	}));
	    		}
	    	}
	    }
    }
}, 2000);


