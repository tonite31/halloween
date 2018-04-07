var AppController = require('../controllers/app.controller.js');

module.exports = function(app)
{
    app.get('/', AppController.renderApp);
    app.get('/login', AppController.renderLoginCallback);
};