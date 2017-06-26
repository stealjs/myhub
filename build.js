var path = require("path");
var stealTools = require("steal-tools");

stealTools.build(
  {},
  {
    bundleSteal: true,
    dest: path.join(__dirname, "out")
  }
);
