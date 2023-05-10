/**
    Module dependencies.
    @module app
*/

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 9000;

app.use(cors());

// Serve static files from the public folder
app.use(express.static('public'));

/**
    GET /
    @function
    @memberof module:app
    @param {Object} req - Express request object.
    @param {Object} res - Express response object.
    @param {function} next - Express middleware next function.
    @returns {Object} - HTML file.
*/
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

// Start listening on the specified port
app.listen(port, () => {
  console.log(`Web server listening on port ${port}`)
})