var http = require('http')
  , os   = require('os')
  , url  = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  var call = url.parse(req.url).pathname.replace(/.*\/|\.[^.]*$/g, '')
    , keys = Object.keys(os).filter(function(element) {return element !== "EOL"});
  if (call === "all") {
    keys.map(function(method) {
      res.write(method + ":" + JSON.stringify(os[method](), 2, true)) + ",\n";
    })
  }
  else {
      try {
          var resu = os[call]();
          res.write(JSON.stringify(resu), 'utf8');
      }
      catch(e) {
          res.end("Sorry, try \"all\" one of these available actions: " + keys.join(", "));
      }
  }

  res.end();
}).listen(1337, "localhost");
console.log('Server running at http://localhost:1337/');
