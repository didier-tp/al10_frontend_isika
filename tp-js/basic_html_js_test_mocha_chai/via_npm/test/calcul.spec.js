//load js script form html 
fs = require('fs')
myCode = fs.readFileSync('./js/calcul.js','utf-8') // depends on the file encoding
eval(myCode)
//or load xyz.js as a node module (export & require)
		
		var chai = require("chai");
		var expect = chai.expect;
		
		describe("my calculator tests", function () {
            var detector;

            beforeEach(function () {
                console.log("initialisation : new ... or ..." );
            });

            it("2+3==5?", function () {
                expect(calculerOp('+',2,3)).to.equal(5);
            });
            it("2*3==6?", function () {
                expect(calculerOp('*',2,3)).to.equal(6);
            });
            
        });
