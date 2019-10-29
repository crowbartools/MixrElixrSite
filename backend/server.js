const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB.
const ElixrDbGeneral = require('./database/general');
ElixrDbGeneral.connect();

const APIRegisterRoutes = require('./api/registerRoutes');
APIRegisterRoutes.registerRoutes(app);

// Starting the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})