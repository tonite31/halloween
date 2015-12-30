module.exports = function()
{
	this.bind('get', '/', function (req, res)
	{
		res.xrender("index");
	});
};