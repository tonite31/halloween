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

            var match = layout.match(/\${[a-z]*}/gi);
            if(match)
            {
                for(var i=0; i<match.length; i++)
                {
                    var fileName = match[i].replace('${', '').replace('}', '');
                    if(fs.existsSync('./public/' + fileName + '.html'))
                    {
                        var content = fs.readFileSync('./public/' + fileName + '.html');
                        layout = layout.replace(match[i], content);
                    }
                }
            }

            layout = layout.replace('{{isLogin}}', options.isLogin);

            callback(null, layout);
        });
    });

    app.set('views', './public');
    app.set('view engine', 'html');
};