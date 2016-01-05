var ximpl = {};
(function()
{
	this.initializeElement = function(id, callback)
	{
		var element = document.querySelector("*[data-component='" + id + "']");
		if(element)
			callback.call(element);
	};
	
	this.compile = function(id, callback)
	{
		if(document.readyState === "complete")
		{
			this.initializeElement(id, callback);
		}
		else
		{
			window.addEventListener("load", function()
			{
				this.initializeElement(id, callback);
			}.bind(this));
		}
	};
}).call(ximpl);