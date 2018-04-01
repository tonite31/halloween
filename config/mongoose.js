var config = require('../local-env.json');

module.exports = function(callback)
{
    var mongoose = global.mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function()
    {
        console.log("Connected to mongod server");
        callback();
    });
    
    mongoose.connect(process.env.MONGODB_URI || config.MONGODB_URI);
};