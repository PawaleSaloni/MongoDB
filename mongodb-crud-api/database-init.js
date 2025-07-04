// database-init.js
const mongoose = require('mongoose');
const config = require('./config'); 


exports.initializeDatabase = async function() {
    try {
      await mongoose.connect(config.mongoURI);
      console.log('MongoDB connected');
    } catch (err) {
      console.error('Error initializing database:', err.message);
    }
  }
  
  

