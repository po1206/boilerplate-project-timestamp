// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
// app.get("/api/", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

app.get("/api/:date_string?", (req, res) =>{
  let dateString = req.params.date_string;

  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({unix: dateInt, utc: new Date(dateInt).toUTCString()});
  } else{
    let dateObj = dateString ? new Date(dateString) : new Date();
    if (dateObj.toString() === "Invalid Date") {
      res.json({error: "Invalid Date"});
    } else {
      res.json({ unix: dateObj.valueOf(), utc: dateObj.toUTCString()});
    }
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
