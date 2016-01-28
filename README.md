# Halloween

Halloween is a web server application for nodejs.

## Installation and run.
```javascript
npm install halloween

node app.js
```
If you set a specific port, add a option -port=xxxx. default port number is 3000.
```javascript
node app.js -port=3001
```

## Basic module structure
Halloween must has a main module.
- halloween
  - modules
    - main /* name of module */
      - controller
        - binder
        - router
      - views
        - css
        - js
        - libs
        - template
          
## Example
Structure of example projects.
- halloween
  - modules
    - main /* name of module */
      - controller
        - binder
        - router
          - MainRouter.js
      - views
        - css
        - js
        - libs
        - template
          - index.html
          
### index.html
```html
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=EDGE"/>

<script type="text/javascript" src="@{libs/hallo.js}"></script>
<script type="text/javascript" src="@{js/index.js}"></script>
<link rel="stylesheet" type="text/css" href="@{css/index.css}" />

<title>Title</title>

<script id="urlParam" type="text/template">
{{#if list}}
{{#each list}}
<li>{{urlParam}}</li>
{{/each}}
{{/if}}
</script>

</head>

<body>
	<h1>Example</h1>
	<div>
		<p>Hello #{name}!</p>
	</div>
	<div>
		<p>URL parameter list.</p>
		<ul data-bind="urlParam" data-param='{"url1" : "#{1}", "url2" : "#{2}"}' data-template="#urlParam"></ul>
	</div>
</body>

</html>
```

### MainRouter.js
This router render index.html
```javascript
module.exports = function(app)
{
	//You can use regexp at path.
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
```

### HelloWorldBinder.js
```javascript
module.exports.urlParam = function(param, done) // This param is in "data-param" attribute on the element.
{
	var list = [];
	if(param.url1)
		list.push({urlParam : param.url1});
	if(param.url2)
		list.push({urlParam : param.url2});
	
	done({list : list});
};
```

### Run on browser
```
http://localhost:3000/list1/list2
```
          
## Binder
You can add a databind module of imp in binder directory. See [imp](https://github.com/tonite31/imp).
This is a set of example of binder module.
```javascript
module.exports.urlParam = function(param, done)
{
	var list = [];
	if(param.url1)
		list.push({urlParam : param.url1});
	if(param.url2)
		list.push({urlParam : param.url2});
	
	done({list : list});
};
```
How to use this module in html.
```html
<!-- You must write a template script in head -->
<script id="urlParam" type="text/template">
{{#if list}}
{{#each list}}
<li>{{urlParam}}</li>
{{/each}}
{{/if}}
</script>
<ul data-bind="urlParam" data-param='{"url1" : "#{1}", "url2" : "#{2}"}' data-template="#urlParam"></ul>
```
          
## Syntax

### @{}
This syntax is replaced to specific path in module.
Using like @{path} or @{prefix:path}.
Prefix is a name of module. @{path} == @{main:path}.
```html
<script type="text/javascript" src="@{js/index.js}"></script>
<script type="text/javascript" src="@{example:js/example.js}"></script>
```

### \#{}, ${}
Halloween use a imp. this is a syntax of imp.
See [imp](https://github.com/tonite31/imp).