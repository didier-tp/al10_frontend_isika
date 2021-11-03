/*
//load js script form html 
fs = require('fs')
myCode = fs.readFileSync('./js/calcul.js','utf-8') // depends on the file encoding
eval(myCode)
//or load xyz.js as a node module (export & require)
*/
		
		
		describe("my calculator tests", function () {
            var detector;

            beforeEach(function () {
                console.log("initialisation : new ... or ..." );
            });

            it("2+3==5?", function () {
                expect(calculerOp('+',2,3)).toBe(5);
            });
            it("2*3==6?", function () {
                expect(calculerOp('*',2,3)).toBe(6);
            });
            
        });
