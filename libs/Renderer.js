var Renderer = {};

(function()
{
	this.imp = null;
	
	this.replacePath = function(html)
	{
		var matchList = html.match(/\@\{[a-zA-Z0-9\_\-\.\:]*\}/gi);
		if(matchList)
		{
			for(var i=0; i<matchList.length; i++)
			{
				var split = matchList[i].replace("@{", "").replace("}", "").split(":");
				
				if(split.length == 2)
				{
					var prefix = split[0];
					var name = split[1];
					html = html.replace(matchList[i], "/modules/" + prefix + "/fragment/" + name.split("\.")[0] + "/" + name);
				}
				else
				{
					var name = split[0];
					html = html.replace(matchList[i], "/modules/main/fragment/" + name.split("\.")[0] + "/" + name);
				}
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
						//여기서 데이터바인딩을 하면 되겠다.
						//html을 크리오로 읽어서 할건가?
						
						html = Renderer.replacePath(html);
						
						res.writeHead(200, {"Content-Type" : "text/html"});
						res.end(html);
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