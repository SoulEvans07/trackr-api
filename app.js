var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ));

var port = 3000;

/**
 * Let's create the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];

    res.tpl.title = "noTitle";

    return next();
});


/**
 * Include all the routes
 */
require('./routes/outside')(app);
require('./routes/users')(app);
require('./routes/tasks')(app);


/**
 * Redirect main to /tasks
 */
app.use('/', function (req, res, next) {
    return res.redirect('/tasks');
})


/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send('Houston, we had a problem!');

    // Flush out the stack to the console
    res.tpl.error.forEach(function (error) {
        console.error("[OWN] " + error);
    });

    if(typeof err !== 'undefined' && err != null) {
        //console.error('[ERROR] ' + err.message);
        console.error("[---------------------Stack---------------------]");
        console.error(err.stack);
        console.error("[-----------------------------------------------]");
    }
});


var server = app.listen(port, function(){
    console.log("Listening on " + port + " port ");
});
