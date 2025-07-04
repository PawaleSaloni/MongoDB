// config.js
require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGODB_URI,
  port: process.env.PORT || 9000
};
