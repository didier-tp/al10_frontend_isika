import chai from 'chai'; 
import { DeviseDataService } from "../core/itf/devisedataService";
import { MemDeviseService } from "../core/mem/MemDeviseDataService"
import { Devise } from '../model/devise';
import { MongoDeviseService } from '../core/mongo/MongoDeviseDataService';
let expect = chai.expect;

var deviseDataService : DeviseDataService //=new MemDeviseService();
                  = new MongoDeviseService();

describe("internal deviseService", function() {

  before( async function() {
    // runs before all tests :
    //insertion d'un jeu de données ou bien autres initialisations             
  });
    
  describe("getAllDevises", function() {
    it("returning at least 4 devises", async function() {
      let devises: Devise[] = await deviseDataService.findAll();
      expect(devises.length).to.gte(4); //greater or equals
    });
  });

  describe("getDeviseByCode", function() {
   it("euro for code EUR", async function() {
      let deviseEur: Devise = await deviseDataService.findById("EUR");
      console.log("deviseEur:"+JSON.stringify(deviseEur));
      expect(deviseEur.nom).equals("Euro");
    });
    

   it("saveOrUpdate_et_getByIdEnchaine", async function() {
    try{
      let nouvelleDev :Devise = { code : "Da1" , nom : "devise a1" , change : 123};
      //let nouvelleDev :Devise = { code : "Da1Wrong" , nom : "devise a1" , change : 123};
      let dEnregistree = await deviseDataService.saveOrUpdate(nouvelleDev);
      let deviseRelue = await deviseDataService.findById("Da1");
      console.log("deviseRelue (after saveOrUpdate):"+JSON.stringify(deviseRelue));
      expect(deviseRelue.nom).equals("devise a1");
      //supprimer la devise (pour ne pas perturber le prochain lancement):
      await deviseDataService.deleteById("Da1");
    }
    catch(err){ 
      console.log("err:" + err); 
       throw err;
      }             
  });

  });

  

});