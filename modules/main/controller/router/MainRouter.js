module.exports = function()
{
	//You can use regexp at path.
	this.bind('get', '/[a-zA-Z0-9]*', function (req, res)
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