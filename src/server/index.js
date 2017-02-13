const http = require('http');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const vm = require('vm');
const concat = require('concat-stream');

// Helpers

function isString(x) {
  return Object.prototype.toString.call(x) === "[object String]"
}

http.createServer(function(req, res) {
  if (req.url === '/' && req.method === 'POST') {
    // Load in the json payload from the body
    var concatStream = concat(getBody);
    req.pipe(concatStream);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    function getBody(body) {
      // Read the payload
      let {
        location = "",
        props = {}
      } = JSON.parse(body);

      // If location is not a string
      if (!location || (isString(location) && location.length < 1)) {
        res.statusCode = 400;
        res.end();
      }

      console.time("async");
      http.get({
        location: 'localhost',
        port: 8000,
        path: location
      }, function(asyncRes) {
        asyncRes.setEncoding('utf8');
        asyncRes.pipe(concat({encoding: 'string'}, function(module) {
          var script = vm.createScript(module);
          var {default: App} = script.runInNewContext({window: false, console: console});
          var html = ReactDOMServer.renderToString(App(props));
          console.timeEnd("async");
          res.end(html);
        }));
      }, function(asyncRes) {
        res.statusCode = 400;
        console.timeEnd("async");
        res.end();
      });
    }
  } else {
    res.statusCode = 404;
    res.end();
  }

// The http server listens on port 3000
}).listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on 3000...')
});
