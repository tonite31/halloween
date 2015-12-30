var fs = require('fs');

(function()
{
	var loader = {get : {}, post : {}, put : {}, delete : {}};
	loader.bind = function(type, path, callback)
	{
		loader[type][path] = callback;
	};
	
	loader.load = function(dir)
	{
		var files = fs.readdirSync(dir);
		
		for(var i=0; i<files.length; i++)
		{
			if(fs.lstatSync(dir + '/' + files[i]).isDirectory())
			{
				loader.load(dir + '/' + files[i]);
			}
			else
			{
				if(dir.lastIndexOf("router") != dir.length-6 || files[i].lastIndexOf(".js") == -1)
					continue;
				
				var router = require(dir + '/' + files[i]);
				router.call(loader);
			}	
		}
	};
	
	module.exports = loader;
})();