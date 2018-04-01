module.exports = function(app)
{
    app.all('/api/*', function(req, res, next)
    {
        if(!req.session.user)
        {
            return res.status(401).end();
        }

        next();
    });
};