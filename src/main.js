import {generateSVG} from "./lib/saville.js";

const init = function() {
  console.log("hi")
  let svg = generateSVG("mesh fact75");
  
  let container = document.getElementById("svg-containter")
  container.append(svg)

};

window.onload = function() {
    init();
  };