var fs = require('fs');

module.exports = function(app)
{
	var moduleRefreshChecker = {};
	var routing = function(type, req, res, next)
	{
		var path = req.path.substring(1);
		if(path.match(/[a-z0-9\/\.]*/gi))
		{
			var split = path.split('/');
			try
			{
				var moduleName = _path.controller + '/modules/' + split[0] + '.js';

				var stats = fs.statSync(moduleName);
				var modifyTime = new Date(stats.mtime).getTime();
				if(moduleRefreshChecker[moduleName] != modifyTime)
				{
					moduleRefreshChecker[moduleName] = modifyTime;
					delete require.cache[moduleName];
				}
				
				var module = require(moduleName);
				
				for(var i=1; i<split.length; i++)
				{
					module = module[split[i]];
				}
				
				if(module && module[type])
				{
					try
					{
						module[type](req, res, next);
					}
					catch(err)
					{
						res.status(500).send(err);
					}
				}
				else
				{
					res.status(404).end('404');
				}
			}
			catch(err)
			{
				res.status(404).end('404');
			}
		}
		else
		{
			next();
		}
	};
	
	app.get('/*', function(req, res, next)
	{
		routing('get', req, res, next);
	});
	
	app.post('/*', function(req, res, next)
	{
		routing('post', req, res, next);
	});
	
	app.put('/*', function(req, res, next)
	{
		routing('put', req, res, next);
	});
	
	app.delete('/*', function(req, res, next)
	{
		routing('delete', req, res, next);
	});
};