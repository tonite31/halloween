module.exports.textList = function($, el, param, req, next)
{
	var that = this;
	
	var template = this.getTemplate($, el);
	
	var list = [];
	list.push({text : "abc"});
	list.push({text : "abc"});
	list.push({text : "abc"});
	
	$(el).html(template({textList : list}));
	next();
};