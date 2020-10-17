
const path = require('path');
const express = require('express');
const app = express();

// Heroku automagically gives us SSL
// Lets write some middleware to redirect us

// Serve static files
app.use(express.static(__dirname + '/dist/ng7'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ng7/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000);
