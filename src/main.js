import {generateSVG} from "./lib/saville.js";

const init = function() {

  let container = document.getElementById("svg-containter")

  const inputField = document.getElementById('input_field');

  inputField.addEventListener('input', function(event) {

      let svg = generateSVG(event.target.value);

      container.innerHTML = '';

      container.append(svg)
  });

  
  

};

window.onload = function() {
    init();
  };