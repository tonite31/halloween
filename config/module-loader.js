var chalk = require('chalk');
var fs = require('fs');
module.exports = function(app)
{
    console.log(chalk.green('[Load Modules]'));
    var list = fs.readdirSync('./src/models');
    for(var i=0; i<list.length; i++)
    {
        if(list[i].endsWith('.js'))
        {
            console.log(list[i]);
            require(_path.home + '/src/models/' + list[i]);
        }
    }

    list = fs.readdirSync('./src/middlewares');
    for(var i=0; i<list.length; i++)
    {
        if(list[i].endsWith('.js'))
        {
            console.log(list[i]);
            require(_path.home + '/src/middlewares/' + list[i])(app);
        }
    }

    list = fs.readdirSync('./src/routes');
    for(var i=0; i<list.length; i++)
    {
        if(list[i].endsWith('.js'))
        {
            console.log(list[i]);
            require(_path.home + '/src/routes/' + list[i])(app);
        }
    }

    console.log();
};