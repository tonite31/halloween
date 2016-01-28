module.exports = function(app)
{
	//You can use regexp at path.
	app.get('/', function (req, res)
	{
		res.render("index", param);
	});
};