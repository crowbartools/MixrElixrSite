const express = require('express');
const helmet = require('helmet');
const cors = require('./api/cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Globals
global.app = app;

// Middleware
app.use(helmet()); // Use first.
app.use(cors.corsPolicy);
app.use(express.json());

// Connect to MongoDB.
const ElixrDbConnect = require('./database/connect');
ElixrDbConnect.connect();

// Register our api routes.
const APIRegisterRoutes = require('./api/registerRoutes');
APIRegisterRoutes.registerRoutes();

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})