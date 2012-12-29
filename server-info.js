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
  } else {
      try {
          var result = os[call]();
          res.write(JSON.stringify(result), 'utf8');
      }
      catch(e) {
          res.end("Unknown action. Try \"all\" to retrieve all the available information or use one of these specific actions: " + keys.join(", "));
      }
  }

  res.end();
}).listen(3001, "localhost");
console.log('Server running at http://localhost:3001/');
