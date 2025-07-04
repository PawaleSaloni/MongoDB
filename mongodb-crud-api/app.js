const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');
const mongoDBMgr = require('./database-init.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

mongoDBMgr.initializeDatabase();

// Routes
app.use('/api/customers', require('./routes/customer'));
app.use('/api/products', require('./routes/product'));

// Start server
const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
