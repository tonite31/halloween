var fs = require('fs');
var list = fs.readdirSync('./src/models');
for(var i=0; i<list.length; i++)
{
    if(list[i].endsWith('.js'))
    {
        require(_path.home + '/src/models/' + list[i]);
    }
}