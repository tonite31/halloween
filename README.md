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

## Basic structure
- halloween
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

### Run on browser
```
http://localhost:3000/
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