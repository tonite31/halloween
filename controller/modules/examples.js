module.exports.test =
{
	get : function(req, res, next)	
	{
		res.end('get');
	},
	post : function(req, res, next)
	{
		res.end('post');
	},
	put : function(req, res, next)
	{
		res.end('put');
	},
	delete : function(req, res, next)
	{
		res.end('delete');
	}
};