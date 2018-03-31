module.exports = function(app)
{
    var error = console.error;
    app.use(function(err, req, res, next)
    {
        error('=================================================');
        error('time : ' + new Date().toString());
        error('name : Exception');
        error('-------------------------------------------------');
        error(err.stack);
        error('=================================================');
    
        res.statusCode = 500;
        res.send(err.stack);
    });
    
    process.on('uncaughtException', function (err)
    {
        error('\n\n');
        error('=================================================');
        error('time : ' + new Date().toString());
        error('name : UncaughtException');
        error('-------------------------------------------------');
        error(err.stack);
        error('=================================================\n\n');
    });
    
    console.error = function(err, kakaoId)
    {
        error('=================================================');
        error('time : ' + new Date().toString());
        error('name : Exception');
        error('-------------------------------------------------');
        if(kakaoId)
        {
            error('[[ ' + kakaoId + ' ]]');
        }
        error(err.stack || err);
        error('=================================================');
    };
};