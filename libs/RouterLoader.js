var fs = require('fs');

(function()
{
	var loader = function(dir)
	{
		var files = fs.readdirSync(dir);
		
		for(var i=0; i<files.length; i++)
		{
			if(fs.lstatSync(dir + '/' + files[i]).isDirectory())
			{
				loader(dir + '/' + files[i]);
			}
			else
			{
				if(dir.lastIndexOf("routers") != dir.length-7 || files[i].lastIndexOf(".js") == -1)
					continue;
				
				var router = require(dir + '/' + files[i]);
				router(_app);
			}	
		}
	};
	
	module.exports = loader;
})();