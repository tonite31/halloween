var fs = require('fs');
var AppConfig = require('../appconfig.json');
module.exports = function(app)
{
    // var ga = fs.readFileSync('./ga');
    app.engine('html', function(filePath, options, callback)
    {
        fs.readFile(filePath, function(err, layout)
        {
            if(err)
                return callback(new Error(err));

            layout = layout.toString();

            var match = layout.match(/\${[a-z\/]*}/gi);
            if(match)
            {
                for(var i=0; i<match.length; i++)
                {
                    var fileName = match[i].replace('${', '').replace('}', '');
                    if(fs.existsSync('./App/' + fileName + '.html'))
                    {
                        var content = fs.readFileSync('./App/' + fileName + '.html');
                        layout = layout.replace(match[i], content);
                    }
                }
            }

            var list = fs.readdirSync('./App/Views');
            if(list)
            {
                var html = '';
                for(var i=0; i<list.length; i++)
                {
                    html += fs.readFileSync('./App/Views/' + list[i] + '/' + list[i] + '.html');
                }

                layout = layout.replace('@{Views}', html);
            }

            var match = layout.match(/{{[\sa-zA-Z\.]*}}/gi);
            if(match)
            {
                for(var i=0; i<match.length; i++)
                {
                    var key = match[i].replace('{{', '').replace('}}', '').trim();

                    var values = undefined;
                    var keys = key.split('.');
                    for(var j=0; j<keys.length; j++)
                    {
                        if(values && values.hasOwnProperty(keys[j]))
                        {
                            values = values[keys[j]];
                        }
                        else if(AppConfig.hasOwnProperty(keys[j]))
                        {
                            values = AppConfig[keys[j]];
                        }
                    }

                    if(values != undefined)
                    {
                        layout = layout.replace(match[i], values);
                    }
                }
            }

            callback(null, layout);
        });
    });

    app.set('views', './App');
    app.set('view engine', 'html');
};