chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var url = "http://localhost:8080/client_servlet/surffer";
	var method = "POST";
	var postData = encodeURIComponent(request.source);
	var async = true;
	xmlhttp.open(method, url, async);

	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-16");
//	xmlhttp.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
	// Or... whatever
	// Actually sends the request to the server.
	xmlhttp.send("webPage="+postData);
    message.innerText = "Request Succesfully sent"; //xmlhttp.responseText;
 message.innerText = postData;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
