var AppController = require('../controllers/app.controller.js');

module.exports = function(app)
{
    app.get('/', AppController.render);
};