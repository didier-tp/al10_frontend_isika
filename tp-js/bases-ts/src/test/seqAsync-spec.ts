import chai from 'chai'; 
import { User , Account , MyAsyncSequence } from '../seqAsync-promise';
var expect = chai.expect;

describe("MyAsyncSequence tests", function () {

    beforeEach(function () {
        //console.log("initialisation : new ... or ..." );
    });

   
    it("account with .num==2 when calling getAccountByNumAfterDelay(2,500)", function () {
        return MyAsyncSequence.getAccountByNumAfterDelay(2,500)
        .then( (account)=> { expect(account.num).to.equals(2); })
        .catch( (err) => { expect.fail(err); })
    }); 
    
    it("user with .userId==6 when calling getUserByIdAfterDelay(6,500)", async function () {
        try{
            const user = await MyAsyncSequence.getUserByIdAfterDelay(6,500);
            expect(user.userId).to.equals(6);
        }catch( err)  { 
            expect.fail(err); 
        }
    });
    
});
		
