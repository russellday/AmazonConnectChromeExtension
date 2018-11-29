
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

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
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
//var rule  = '.row {width: 100%;text-align: center;}';
//    rule += '.block {width: 100px;display: inline-block;zoom: 1;}'
var rule = '#divConnectId {position: absolute;z-index: 9;background-color: #f1f1f1;border: 1px solid #d3d3d3;text-align: center;}'
    rule += '#divConnectHeader {padding: 10px;cursor: move;z-index: 10;background-color: #2196F3;color: #fff;}';


// Load the rules and execute after the DOM loads
window.onload = function() {
  addCss(rule);
  dragElement(document.getElementById("divConnectId"));
};

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


