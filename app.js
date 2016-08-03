/**
 * import modules
 */
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

/**
 * set global variables
 */
global._path =
{
	home : __dirname,
	controller : __dirname + '/controller',
	views : __dirname + '/views',
	libs : __dirname + '/libs'
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
	
	var split = val.split('=');
	if(_options.hasOwnProperty(split[0]))
		_options[split[0]] = split[1];
});

/**
 * create express and imp
 */
var app = global._app = express();
var server = app.listen(_options.port, function()
{
	console.log('Listening on port %d', server.address().port);
});

var imp = require('nodejs-imp');
imp.setPattern(_path.home + '/views/html/{{name}}.html');

var Renderer = require(_path.libs + '/Renderer');
imp.addRenderModule(Renderer.replacePath);

/**
 * set static dirs
 */
app.use('/views', express.static(_path.views));

/**
 * set middleware
 */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(imp.render);

/**
 * error handling
 */
app.use(function(err, req, res, next)
{
	console.error('=================================================');
	console.error('time : ' + new Date().toString());
	console.error('name : Exception');
	console.error('-------------------------------------------------');
	console.error(err.stack);
	console.error('=================================================');

	res.statusCode = 500;
	res.send(err.stack);
});

process.on('uncaughtException', function (err)
{
	console.error('\n\n');
	console.error('=================================================');
	console.error('time : ' + new Date().toString());
	console.error('name : UncaughtException');
	console.error('-------------------------------------------------');
	console.error(err.stack);
	console.error('=================================================\n\n');
});

var routerLoader = require(_path.libs + '/RouterLoader');
routerLoader(_path.controller + '/routers');