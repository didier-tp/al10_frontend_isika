import chai from 'chai';  
import { SimpleAsync } from '../simpleAsync';
var expect = chai.expect;

describe("my simpleAsync tests", function () {
    var simpleAsync : SimpleAsync;

    beforeEach(function () {
        console.log("initialisation : new ... or ..." );
        simpleAsync = new SimpleAsync();
    });

    /*
    it("abc shoud be ABC in upperCase with done called", function (done) {
        simpleAsync.getUppercaseDataAfterDelay("abc",500)
        .then( (s)=> { expect(s).to.equals("ABC"); })
        .then( () => { console.log("ok"); done();})
        .catch( (err) => { console.log("err:"+err); expect.fail(err); })
        .catch( (err) => { done(err); })
    }); 
    */
   
    it("abc shoud be ABC in upperCase with returned Promise ", function () {
        return simpleAsync.getUppercaseDataAfterDelay("abc",500)
        .then( (s)=> { expect(s).to.equals("ABC"); })
        .catch( (err) => { expect.fail(err); })
    }); 
    
    it("abc shoud be ABC in upperCase with async/await", async function () {
        try{
            const s = await simpleAsync.getUppercaseDataAfterDelay("abc",500);
            expect(s).to.equals("ABC");
        }catch( err)  { 
            expect.fail(err); 
        }
    });
    
});
