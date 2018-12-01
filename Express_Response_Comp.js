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

    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'html/plain'});
        var html = fs.readFileSync(__dirname + "/index.html")
    }
/* both IF statements will be evaluated and if they both come
up empty a 404 error will get sent back. */
    res.writeHead(404);
    res.end();

}).listen(1337,'127.0.0.1');

////////////   THIRD ITERATION    ///////////////
