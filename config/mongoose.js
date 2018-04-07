const chalk = require('chalk');
const config = require('../local-env.json');

module.exports = function(callback)
{
    const uri = process.env.MONGODB_URI || config.MONGODB_URI;
    const mongoose = global.mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    const db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function()
    {
        console.log(chalk.green('[Connected to mongod server]'));
        console.log(chalk.blue(uri));
        console.log();
        callback();
    });

    mongoose.connect(uri);
};