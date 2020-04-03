const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

require('dotenv').config(); 

const port = process.env.PORT || 9000;

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`)
})
