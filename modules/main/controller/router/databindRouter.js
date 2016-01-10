module.exports = function()
{
	this.bind('post', '/databind/[a-zA-Z]', function (req, res)
	{
		console.log("파람 : ", req.body);
		
		res.end("");
	});
};