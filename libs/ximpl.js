var ximpl = {};
(function()
{
	this.compile = function(id, callback)
	{
		if(document.readyState === "complete")
		{
			var element = document.querySelector("*[data-imp-id='" + id + "']");
			callback.call(element);
		}
		else
		{
			window.addEventListener("load", function()
			{
				var element = document.querySelector("*[data-imp-id='" + id + "']");
				callback.call(element);
			});
		}
	};
}).call(ximpl);