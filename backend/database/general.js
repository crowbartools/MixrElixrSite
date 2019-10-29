'use strict';

const mongoose = require('mongoose');

// Connect to MongoDB.
function connect(){
    const uri = process.env.ATLAS_URI;
    mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('MongoDB database connection successfully established.');
    })
}

module.exports.connect = connect;