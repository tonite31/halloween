/**
 * import modules
 */
var express = require('express');
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

/**
 * set global variables
 */
global._path =
{
	home : __dirname,
	modules : __dirname + "/modules",
	libs : __dirname + "/libs"
};

/**
 * set process options
 */
global._options = 
{
	port : 3000
};

process.argv.forEach(function (val, index, array)
{
	val = val.substring(1); //parse character '-'
	
	var split = val.split("=");
	if(_options.hasOwnProperty(split[0]))
		_options[split[0]] = split[1];
});

/**
 * create express and imp
 */
var app = express();
var server = app.listen(_options.port, function()
{
	console.log('Listening on port %d', server.address().port);
});

var imp = require('nodejs-imp');
imp.setPattern(_path.modules + "/main/component/{{name}}/{{name}}.html");
imp.setPattern(_path.modules + "/{{prefix}}/component/{{name}}/{{name}}.html", "[a-z0-9\-\_]*");

/**
 * set static dirs
 */
app.use('/ximpl', express.static(_path.libs + "/ximpl.js"));
app.use('/modules', express.static(_path.modules));

/**
 * set middleware
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

//imp 연동
app.use(function(req, res, next)
{
	var domain = require("domain");
	var reqDomain = domain.create();

    reqDomain.add(req);
    reqDomain.add(res);
    
    res.xrender = function(name, param)
	{
		imp.getHtml(name, param, function(err, html)
		{
			if(err)
			{
				res.status(500).send(err.stack);
			}
			else
			{
				//여기서 데이터바인딩을 하면 되겠다.
				//html을 크리오로 읽어서 할건가?
				
				res.writeHead(200, {"Content-Type" : "text/html"});
				res.end(html);
			}
		});
	};

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
});

/**
 * error handling
 */
app.use(function(err, req, res, next)
{
	console.error("=================================================");
	console.error("time : " + new Date().toString());
	console.error("name : Exception");
	console.error("-------------------------------------------------");
	console.error(err.stack);
	console.error("=================================================");

	res.statusCode = 500;
	res.send(err.stack);
});

process.on('uncaughtException', function (err)
{
	console.error("\n\n");
	console.error("=================================================");
	console.error("time : " + new Date().toString());
	console.error("name : UncaughtException");
	console.error("-------------------------------------------------");
	console.error(err.stack);
	console.error("=================================================\n\n");
});

var routerLoader = require(_path.libs + "/RouterLoader");
routerLoader.load(_path.modules);

var typeList = ['get', 'post', 'put', 'delete'];
for(var i=0; i<typeList.length; i++)
{
	(function(type)
	{
		app[type]('/*', function(req, res, next)
		{
			if(routerLoader[type][req.path])
			{
				routerLoader[type][req.path](req, res, next);
			}
			else
			{
				res.status(404).end("Not Found");
			}
		});
	})(typeList[i]);
}