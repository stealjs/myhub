import $ from "jquery";
import "bootstrap/dist/css/bootstrap.css";
import "./weather.css";

function toClassName(txt) {
  return txt.toLowerCase().replace(/ /g, "-");
}

export default function(selector) {
  var city = "chicago il";
  $(selector).html("Loading...");
  $.ajax({
    url: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places%20where%20text%3D%22${city}%22)&format=json&diagnostics=true&callback=`
  }).then(function(response) {
    var weather = response.query.results.channel;
    var forecast = weather.item.forecast;
    var defs = forecast.map(function(day) {
      return `
          <li>
            <span class="date">${day.date}</span>
            <span class="description ${toClassName(
              day.text
            )}">${day.text}</span>
            <span class="high-temp">${day.high}<sup>&deg;</sup></span>
            <span class="low-temp">${day.low}<sup>&deg;</sup></span>
          </li>
        `;
    });
    $(selector).html(`
        <div class="forecast">
          <ul>
            ${defs.join("")}
          </ul>
        </div>
      `);
  });
}
