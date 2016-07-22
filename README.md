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

### Run on browser
```
http://localhost:3000/
```

## REST Api module.
You can create REST Api module easily. see, examples module in /controller/modules directory.
          
## Syntax

### @{}
This syntax is replaced to specific path.
Using like @{path}
```html
<script type="text/javascript" src="@{js/index.js}"></script>
```