var chalk = require('chalk');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var helmet = require('helmet');

var favicon = require('serve-favicon');

global._path =
    {
        home : __dirname,
        src : __dirname + '/src',
        App : __dirname + '/App',
        libs : __dirname + '/libs'
    };

require('./config/mongoose.js')(function()
{
    var app = global._app = express();
    var server = app.listen(process.env.PORT || 3000, function()
    {
        console.log(chalk.green('Listening on port', server.address().port));
        console.log();
    });

    app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(methodOverride());
    app.set('trust proxy', 1);
    app.use(session({ secret: 'halloween', name: 'sessionId', resave: true, saveUninitialized: true, cookie: {expires: new Date(Date.now() + 60 * 60 * 2 * 1000), maxAge: 60 * 60 * 2 * 1000}}));
    //app.use(favicon(__dirname + '/favicon.png'));

    app.use(helmet());
    app.disable('x-powered-by');

    require('./config/view-engine.js')(app);
    require('./config/error-handler.js')(app);
    require('./config/module-loader.js')(app);

    app.use('/App', express.static('./App'));
});