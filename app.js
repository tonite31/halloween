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
	content : __dirname + "/content",
	src : __dirname + "/src",
	props : __dirname + "/properties",
	log : __dirname + "/logs",
	plugins : __dirname + "/plugins"
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

var imp = require('imp');
imp.setPattern(_path.plugins + "/main/component/{{name}}/{{name}}.html");
imp.setPattern(_path.plugins + "/{{prefix}}/component/{{name}}/{{name}}.html", "[a-z0-9\-\_]*");

/**
 * set static dirs
 */
app.use('/content', express.static(_path.content));

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

//모듈과 라우터 로딩해야한다. //모듈은 데이터바인드 할 때 require해서 쓰면 될거 같긴한데..
//로컬파일 및 리모트 파일까지 생각해야한다.