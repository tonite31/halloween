module.exports = function()
{
	this.bind('get', '/[a-zA-Z0-9]*', function (req, res)
	{
		var split = req.path.split("/");
		
		var param = {};
		for(var i=1; i<split.length; i++)
		{
			param[i] = split[i];
		}
		
		if(!param[1])
			param[1] = "summary";
		
		res.xrender("index.html", param);
	});
};