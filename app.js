var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

var errorHandler = require('./middlewares/generic/errorHandler');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));

var port = 3000;

// * Session above all
app.use(session({
    secret: 'thousand master',
    cookie: {
        // maxAge: 30*60000
    },
    resave: true,
    saveUninitialized: false
}));


// * Let's create the .tpl and .error on the res object
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    return next();
});


// * Include all the routes
require('./routes/outside')(app);
require('./routes/users')(app);
require('./routes/tasks')(app);


// * Redirect main to /tasks
app.use('/', function (req, res, next) {
    return res.send('<h1>node:TrackR</h1>');
})


// * Standard error handler
app.use(errorHandler());


var server = app.listen(port, function(){
    console.log('Listening on ' + port + ' port ');
});
