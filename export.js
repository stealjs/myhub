var path = require("path");
var stealTools = require("steal-tools");

stealTools.export({
  steal: {
    main: "myhub/weather/weather",
    config: path.join(__dirname, "package.json!npm")
  },
  options: {
    verbose: true
  },
  outputs: {
    "+amd": {},
    "+global-js": {
      exports: {
        "myhub/weather/weather": "weather",
        jquery: "jQuery"
      },
      dest: path.join(__dirname, "dist", "global", "weather.js")
    },
    "+global-css": {
      dest: path.join(__dirname, "dist", "global", "weather.css")
    }
  }
});
