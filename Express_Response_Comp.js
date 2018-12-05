//////////   FIRST ITERATION    //////////////////

var http = require("http");

// We are streaming back a stored file, hence the fs module.
var fs = require('fs');
/* 
*/

http.createServer(function(req, res){

    /* we are manually filling out the header */
    res.writeHead(200, {'Content-Type': 'html/plain'});
    var html = fs.readFileSync(__dirname + "/index.html")
    /*this sends back the contents of the HTML files */
    res.end(html);

/* Any browser request to this port gets the same message.  No
URL functionality*/
}).listen(1337,'127.0.0.1');

/* The app runs until it is told to stop.  Until then, any time
I go to port 1337 at LOCALHOST or 127.0.0.1 in the browser, 
browser will show 'Hello World'. */


//////////  SECOND ITERATION  ///////////

var http = require("http");
var fs = require('fs');

http.createServer(function(req, res){

    /* Now we can handle different URLs, and we are doing it
    with if() statements */

    if(req.url === '/'){
        // do some function
    }

    if(req.url === '/person'){
        res.writeHead(200, {'Content-Type': 'html/plain'});
        var html = fs.readFileSync(__dirname + "/index.html")
    }
/* both IF statements will be evaluated and if they both come
up empty a 404 error will get sent back. */
    res.writeHead(404);
    res.end();

}).listen(1337,'127.0.0.1');

////////////   THIRD ITERATION    ///////////////

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

/* here we are using express for the first time.  Notice how
the syntax is much neater.

-There's no createServer() call - done automatically.
-No 'if()' statements for each URL.  Just specify the URL in the
    calls of app (which is calling Express)
-No writing to the head, and no error specification AFAICT
-The ability to respond to different HTTP verbs without if() 
    statements, which I think is new?
*/
app.get('/', function(req, res){
    res.send("<html><head></head><body><h1>Hello Dr. Wang!</h1></body></html>");
});

/*  
One last thing to notice in this example.  We're currently sending
responses as HTML.  That will change in the next iteration.
*/
app.get('/person/:id', function(req, res){
    res.send("<html><head></head><body><h1>Person: "+
    req.params.id +"</h1></body></html>");
});

app.listen(port);

////////////   FOURTH ITERATION    ///////////////

var express = require('express');

/* A few new things here.  First, we are using a view engine, EJS.
This is a framework that uses its own format to generate HTML
pages.

The bigger change is that the pages are rendered in separate files,
not strings of HTML like I had before.  AFAICT these are called
'views' even if they are not created with a view engine, and they
are accessed via the .render() method.  .render() is part of 
Express, not a particular view engine.

Last change is that there are different HTTP verbs besides just 
GET.  AFAICT this is useful for allowing outside files to call
back to the main application.  It's also RESTful, but I don't yet
see the benefit of that. */

var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var urlencodedParser = bodyParser.urlencoded({extended: false});

/* This is the new thing.  It's a view engine, which makes
writing pages easier than writing HTML.  However, you do
NOT need a view engine to use this model.  You can just as
easily have HTML in separate files and link to them in 
the same way.*/

app.set('view engine','ejs');


/* The app.use('/assets') is not used anywhere in this program.
However, the views (aka web pages) made with the ejs view engine
WILL sent http requests back through this app.  When they do,
they will be routed to a CSS file at this location so they can 
all share a single stylesheet.
*/
app.use('/assets', express.static(__dirname + "/public"));

app.use('/', function(req, res, next){
    console.log('Request URL' + req.url);
    next();
});

app.get('/', function(req, res){
    res.render('index');
});

app.get('/person/:id', function(req, res){
    res.render('person', { ID: req.params.id, Qstr:req.query.qstr });
});

app.post('/person', urlencodedParser, function(req, res){
    res.send("thank you!");
    console.log(req.body.firstname);
    console.log(req.body.lastname);
});


app.listen(port);

////////////   FIFTH ITERATION    ///////////////