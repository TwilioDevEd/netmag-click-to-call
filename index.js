// Require our dependencies
var express     = require('express');
var bodyParser  = require('body-parser');
var twilio      = require('twilio');
var path        = require('path');
var config      = require('./config');

// Create our application instance
var app = express();
// Create a Twilio API client using Account SID and Auth Token
var twilioClient = twilio(config.twilioAccountSid, config.twilioAuthToken);

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
  twilioClient.makeCall({
    to: request.body.phoneNumber,
    from: config.twilioPhoneNumber,
    url: 'http://'+config.ngrokUrl+'/calls/forward'
  }, function(err, responseData){
    if (err) {
      response.render('index', {
        error: err.message
      });
    } else {
      response.render('thanks');
    }
  });
});

app.post('/calls/forward', function(request, response) {
  // TwimlResponse is a builder for the XML we need to return.
  var twiml = new twilio.TwimlResponse();
  twiml.play('http://bit.ly/netmagmp3');

  response.set('Content-Type', 'text/xml');
  response.send(twiml.toString());
});

// Start the app listening on the defined port (or 3000 by default)
var listener = app.listen(process.env.PORT || 3000, function(server) {
  console.log('Application listening on http://localhost:' + listener.address().port);
});
