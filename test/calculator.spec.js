
var expect     = require ('chai').expect;
var calculator = require ('../app/js/calculator.js');


describe ('calculator', function () {

    describe ('#add', function () {

        it ('should add numbers', function () {
            expect (calculator.add (1, 2)).to.equal (3);
            expect (calculator.add (3, 4)).to.equal (7);
        });
    });
});
