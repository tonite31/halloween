module.exports = function()
{
	this.bind('post', '/databind/[a-zA-Z]', function (req, res)
	{
		var moduleName = req.path.replace("/databind/", "");
		
		var list = [];
		list.push({text : "abc"});
		list.push({text : "abc"});
		list.push({text : "abc"});
		
		res.end(JSON.stringify(list));
	});
};