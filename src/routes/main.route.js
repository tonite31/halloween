var MainController = require('../controllers/main.controller.js');

module.exports = function(app)
{
    app.get('/', MainController.renderIndex);
};