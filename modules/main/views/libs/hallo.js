var $ = $ ? $ : {};

$.pageReady = function(callback)
{
	if(document.readyState === "complete")
	{
		callback();
	}
	else
	{
		window.addEventListener("load", function()
		{
			callback();
		}.bind(this));
	}
};

$.get = function(selector)
{
	var result = document.querySelectorAll(selector);
	if(result.length == 1)
		return result[0];
	else
		return result;
};

(function()
{
	$.query = {};
	var split = location.href.split("?");
	if(split && split.length == 2)
	{
		split = split[1].split("&");
		for(var i=0; i<split.length; i++)
		{
			var keyValue = split[i].split("=");
			if(keyValue[1] && keyValue[1].indexOf("#") != -1)
				keyValue[1] = keyValue[1].split("#")[0];

			$.query[keyValue[0]] = decodeURIComponent(keyValue[1]);
		}
	}
})();

$.request = function(data)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open(data.type, data.url);
	xmlhttp.setRequestHeader("Content-type", "application/json");
	xmlhttp.onreadystatechange = function()
	{
	    if (xmlhttp.readyState == XMLHttpRequest.DONE)
	    {
	        if(xmlhttp.status == 200){
	        	if(data.success)
	        		data.success({code : 200, result : xmlhttp.responseText});
	        	else
	        		console.log({code : 200, result : xmlhttp.responseText});
	        }else{
	        	if(data.error)
	        		data.error({code : xmlhttp.status, result : xmlhttp.statusText});
	        	else
	        		console.error({code : xmlhttp.status, result : xmlhttp.statusText});
	        }
	    }
	}
	
	xmlhttp.send(JSON.stringify(data.data));
};