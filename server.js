const finalhandler = require("finalhandler");
const fs = require("fs");
const serveStatic = require("serve-static");
const spdy = require("donejs-spdy");

const argv = require("yargs").argv;

const port = process.env.PORT || 8080;
const serve = serveStatic(".");

if(!argv.cert || !argv.key) {
  console.log("Both --cert and --key flags are required.");
  process.exit(1);
}

function index(data) {
  return `
    <!doctype html>
    <html lang="en">
    <head>
      <title>${data.title}</title>

      <link rel="stylesheet" href="/dist/bundles/myhub/myhub.css">
    </head>

    <body>
      <script src="/dist/bundles/myhub/myhub.js"></script>
    </body>
    </html>
  `;
}

function app(req, res){
  if(req.url === "/") {
    res.end(index({title: "myhub"}));
  } else if(req.url === "/puppies" || req.url === "/weather") {
    var title;

    if(req.url === "/puppies") {
      title = "Puppies";
    } else {
      title = "Weather";
    }

    res.end(index({
      title
    }));
  } else {
    serve(req, res, finalhandler(req, res));
  }
}

spdy.createServer({
  cert: fs.readFileSync(argv.cert),
  key: fs.readFileSync(argv.key),
  spdy: {
    protocols: ["h2", "http/1.1"]
  }
}, app).listen(port);

console.log(`Listening at https://localhost:${port}`);
