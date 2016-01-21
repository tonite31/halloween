module.exports.urlParam = function(param, done)
{
	var list = [];
	if(param.url1)
		list.push({urlParam : param.url1});
	if(param.url2)
		list.push({urlParam : param.url2});
	
	done({list : list});
};