
import {expr}   from './calculator.js'
import keycodes from './keycodes.js'

var input  = document.querySelector ('.expression');
var result = document.querySelector ('.result');

input.addEventListener ('keyup', (event) => {
    if (event.keyCode === keycodes.ENTER) result.innerHTML = '=' + expr (event.target.value)
});
