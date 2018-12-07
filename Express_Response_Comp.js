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
-No 'if()' statements for each URL.  Just specify the URL as a 
    parameter of .get (which is calling Express)
-No writing to the head, and no error specification AFAICT
-The ability to respond to different HTTP verbs differently
    without if() statements, which I think is new?
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
GET.  I don't yet understand why this is valuable. */

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


/* The app.use('/assets') is not used anywhere in app.js
However, the views (aka web pages) made with the ejs view engine
WILL sent HTTP requests back through this app.  When they do,
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

const express = require("express");

/* links to the new external JS files we created to do routing. */

const users = require("./routes/api/users.js");
const profiles = require("./routes/api/profiles.js");
const posts = require("./routes/api/posts.js");

const app = express();

app.get('/', (req,res) => res.send(`<h1>Small Hello<h1>`));

/* 

When the app is run, const users is set to be the result of calling
require() on the given path.  This brings in whatever function that
module contained.  Now that function can be invoked just as easily
as a stock Javascript function just by using the variable.  

This part makes sense.  It fits my previous experience of
app.use("/url", function(req, res){} );  with the only difference
being that in this case, the function - complete with (req, res)
parameters - is from an outside module.  It's the next part I don't
understand.  

*/

app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on ${port}`));

        ////  the users module - still part of 5th Iteration /////

    /* TBH, still not sure what is happening here.   */

    const express = require("express");
    const router = express.Router();

    /* First, remember that nothing goes TO this file.  Everything
    here is loaded into server.js when the app is run.   
    
    My best buiess is that the way this works is that
    EVERYTHING labelled 'router' gets exported? 

    One thing I do think is happening.  I don't have to put in the 
    whole "/api/users/test route in here.  It looks like anything
    that is directed here just needs its final destination?"*/

    router.get('/test', (req, res) => res.json({msg:"Users Works!"}));

    /* Firing up the server and goign to localhost:5000/api/users
    returns an error message saying Cannot GET /api/users 
    */

    module.exports = router;


////////////   SIXTH ITERATION    ///////////////