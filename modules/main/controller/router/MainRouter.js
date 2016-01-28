module.exports = function(app)
{
	app.get('/*', function (req, res)
	{
		var split = req.path.split("/");
		
		var param = {};
		for(var i=1; i<split.length; i++)
		{
			param[i] = split[i];
		}
		
		param.name = "Alprensia";
		
		res.render("index", param);
	});
};