
import calculator from 'calculator.js'
import is from 'keycodes.js'

var input  = document.querySelector ('.expression')
var result = document.querySelector ('.result')

input.addEventListener ('keyup', function (event) {
    is.enter (event.keyCode) && (result.html = calculator.expr (event.target.value));
});
