var fs = require('fs');
var cheerio = require('cheerio');
var DataBinder = require(_path.libs + "/DataBinder");

var Renderer = {};

(function()
{
	this.imp = null;
	
	this.plugins = [];
	
	this.importPlugins = function(dir)
	{
		var files = fs.readdirSync(dir);
		
		for(var i=0; i<files.length; i++)
		{
			if(fs.lstatSync(dir + '/' + files[i]).isDirectory())
			{
				this.importPlugins(dir + '/' + files[i]);
			}
			else
			{
				if(dir.lastIndexOf("renderer") != dir.length-8 || files[i].lastIndexOf(".js") == -1)
					continue;
				
				this.plugins.push(require(dir + '/' + files[i]));
			}	
		}
	};
	
	this.replacePath = function(html)
	{
		var matchList = html.match(/\@\{[a-zA-Z0-9\_\-\.\:\/]*\}/gi);
		if(matchList)
		{
			for(var i=0; i<matchList.length; i++)
			{
				var split = matchList[i].replace("@{", "").replace("}", "").split(":");
				
				var prefix = "main";
				var name = "";
				if(split.length == 2)
				{
					prefix = split[0];
					name = split[1];
				}
				else
				{
					name = split[0];
				}
				
				html = html.replace(matchList[i], "/modules/" + prefix + "/views/" + name);
			}
		}
		
		return html;
	};
	
	this.databind = function(html)
	{
		//렌더러니까 데이터바인드도 하는게 어때서.
	};
	
	this.initialize = function(req, res, next)
	{
		var domain = require("domain");
		var reqDomain = domain.create();

	    reqDomain.add(req);
	    reqDomain.add(res);

	    if(Renderer.imp)
	    {
	    	res.xrender = function(name, param)
			{
	    		Renderer.imp.getHtml(name, param, function(err, html)
				{
					if(err)
					{
						res.status(500).send(err.stack);
					}
					else
					{
						for(var i=0; i<Renderer.plugins.length; i++)
							html = Renderer.plugins[i](html);
						
						html = Renderer.replacePath(html);
						
						//여기서 데이터바인딩을 하면 되겠다.
						//html을 크리오로 읽어서 할건가?
						
						$ = cheerio.load(html);
						
						DataBinder.databind($, $("body"), req, function(html)
						{
							res.writeHead(200, {"Content-Type" : "text/html"});
							res.end(html);
						});
					}
				});
			};
	    }

	    reqDomain.on('error', function (err)
	    {
	    	console.error("\n\n");
	    	console.error("=================================================");
	    	console.error("time : " + new Date().toString());
	    	console.error("name : DomainException");
	    	console.error("-------------------------------------------------");
	    	console.error(err.stack);
	    	console.error("=================================================\n\n");
	    });

	    reqDomain.run(next);
	};
	
}).call(Renderer);

module.exports = Renderer;