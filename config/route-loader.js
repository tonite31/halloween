var fs = require('fs');
module.exports = function(app)
{
    var list = fs.readdirSync('./src/middlewares');
    for(var i=0; i<list.length; i++)
    {
        if(list[i].endsWith('.js'))
        {
            require(_path.home + '/src/middlewares/' + list[i])(app);
        }
    }

    list = fs.readdirSync('./src/routes');
    for(var i=0; i<list.length; i++)
    {
        if(list[i].endsWith('.js'))
        {
            require(_path.home + '/src/routes/' + list[i])(app);
        }
    }
};