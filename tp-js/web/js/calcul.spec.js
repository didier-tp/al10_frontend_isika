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
	it("8-5==3?", function () {
        expect(calculerOp('-',8,5)).toBe(3);
    });
	it("8/4==2?", function () {
         expect(calculerOp('/',8,4)).toBe(2);
    });
            
});
