	  var expect = chai.expect;
  
        describe("my calculator tests le retour", function () {
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
