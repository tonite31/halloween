var fs = require('fs');
module.exports = function(app)
{
    fs.readdir('./src/routes', function(err, list)
    {
        if(err)
        {
            return console.error(err);
        }
    
        for(var i=0; i<list.length; i++)
        {
            if(list[i].endsWith('.js'))
            {
                require(_path.home + '/src/routes/' + list[i])(app);
            }
        }
    });
};