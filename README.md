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
          - index.html (*) /* This file must exist. */
          
## Binder
You can add a databind module of imp in binder directory. See [imp](https://github.com/tonite31/imp).
This is a set of example of binder module.
```javascript
module.exports.helloworld = function(param, done)
{
	done({result : 'Hello ' + param.name + '!'});
};

module.exports.getTestList = function(param, done)
{
	var testList = [{value : '1'}, {value : '2'}, {value : '3'}, {value : '4'}, {value : '5'}];
	done({testList : testList});
}
```
Using this module in html.
```html
<!-- You must write a template script in head -->
<script type="text/template" id="helloworld">
<h1>{{result}}</h1>
</script>
<div data-bind="helloworld" data-param='{"name" : "User"}' data-template="helloworld"></div> 
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