"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = (0, tslib_1.__importDefault)(require("chai"));
const chai_http_1 = (0, tslib_1.__importDefault)(require("chai-http"));
const server_1 = require("../server");
let expect = chai_1.default.expect;
// Configure chai
chai_1.default.use(chai_http_1.default);
//chai.should();
describe("devise api", function () {
    before(function (done) {
        // runs before all tests :
        done();
        //...
    });
    after(function () {
        // runs after all tests :
        server_1.server.close();
    });
    describe("getDeviseByCode", function () {
        it("returns status 200 and a devise object with good name", function (done) {
            chai_1.default.request(server_1.app)
                .get('/devise-api/public/devise/EUR')
                .end((err, res) => {
                //res.should.have.status(200);
                chai_1.default.expect(res).status(200);
                let obj = res.body;
                //obj.should.be.a('object');
                chai_1.default.expect(obj).a('object');
                let devise = obj;
                //console.log(JSON.stringify(devise));
                chai_1.default.expect(devise.nom).equals("Euro");
                done();
            });
        });
    });
});
