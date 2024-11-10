import {generateSVG} from "./lib/saville.js";

const init = function() {

  let container = document.getElementById("svg-containter")

  const inputField = document.getElementById('input_field');
  const checkbox = document.getElementById('outline_cb');

  let f = function(event) {

    let svg = generateSVG(inputField.value, checkbox.checked);

    container.innerHTML = '';

    container.append(svg)
  }

  checkbox.addEventListener('change', f);
  inputField.addEventListener('input', f);
};

window.onload = function() {
    init();
  };