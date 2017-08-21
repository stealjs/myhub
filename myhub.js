import $ from "jquery";

import "./myhub.less";
import "bootstrap/dist/css/bootstrap.css";

$("body").append(`
    <div class="container">
        <h1>Goodbye script tags!</h1>
        <a href="/weather">Weather</a> <a href="/puppies">Puppies</a>
        <div id="main"/>
    </div>
`);

var updatePage = function() {
  var path = location.pathname;
  if (path === "/") {
    $("#main").html("Welcome home");
  } else {
    var page = path.substr(1);
    /* globals steal */
    steal.import(`myhub/${page}/${page}`).then(function(moduleOrPlugin) {
      var plugin = typeof moduleOrPlugin === "function"
        ? moduleOrPlugin
        : moduleOrPlugin["default"];
      plugin("#main");
    });
  }
};

$(window).on("popstate", updatePage);

updatePage();
