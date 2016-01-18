// Require our dependencies
var express     = require('express');
var bodyParser  = require('body-parser');
var twilio      = require('twilio');
var path        = require('path');
var config      = require('./config');

// Create our application instance
var app = express();

// Setup handlebars as the view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Use the Body Parser middleware to parse incoming requests.
app.use(bodyParser.urlencoded({ extended: false }));
// Use the Express Static middleware to serve static assets from the public
// directory.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/calls', function(request, response) {
  // Call the Twilio API here.
  response.render('thanks');
});

app.post('/calls/forward', function(request, response) {
  // Respond to Twilio with TwiML
  response.send('');
});

// Start the app listening on the defined port (or 3000 by defauly)
var listener = app.listen(process.env.PORT || 3000, function(server) {
  console.log('Application listening on http://localhost:' + listener.address().port);
});
