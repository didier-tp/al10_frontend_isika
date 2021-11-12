"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = (0, tslib_1.__importDefault)(require("chai"));
const MongoDeviseDataService_1 = require("../core/mongo/MongoDeviseDataService");
let expect = chai_1.default.expect;
var deviseDataService = new MongoDeviseDataService_1.MongoDeviseService();
describe("internal deviseService", function () {
    before(async function () {
        // runs before all tests :
        //insertion d'un jeu de données ou bien autres initialisations             
    });
    describe("getAllDevises", function () {
        it("returning at least 4 devises", async function () {
            let devises = await deviseDataService.findAll();
            expect(devises.length).to.gte(4); //greater or equals
        });
    });
    describe("getDeviseByCode", function () {
        it("euro for code EUR", async function () {
            let deviseEur = await deviseDataService.findById("EUR");
            console.log("deviseEur:" + JSON.stringify(deviseEur));
            expect(deviseEur.nom).equals("Euro");
        });
        it("saveOrUpdate_et_getByIdEnchaine", async function () {
            try {
                let nouvelleDev = { code: "Da1", nom: "devise a1", change: 123 };
                //let nouvelleDev :Devise = { code : "Da1Wrong" , nom : "devise a1" , change : 123};
                let dEnregistree = await deviseDataService.saveOrUpdate(nouvelleDev);
                let deviseRelue = await deviseDataService.findById("Da1");
                console.log("deviseRelue (after saveOrUpdate):" + JSON.stringify(deviseRelue));
                expect(deviseRelue.nom).equals("devise a1");
                //supprimer la devise (pour ne pas perturber le prochain lancement):
                await deviseDataService.deleteById("Da1");
            }
            catch (err) {
                console.log("err:" + err);
                throw err;
            }
        });
    });
});
