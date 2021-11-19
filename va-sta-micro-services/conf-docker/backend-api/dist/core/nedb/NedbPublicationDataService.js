"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NedbPublicationService = void 0;
const GenericNedbDataService_1 = require("./generic/GenericNedbDataService");
const publication_1 = require("../../model/publication");
// NeDB implementation of PublicationDataService 
class NedbPublicationService extends GenericNedbDataService_1.GenericNedbDataService {
    constructor() {
        super("nedb-test", "publications" /* ,  new Auto_IdHelper<Publication,string>("_id") by default */);
        this.saveOrUpdate(new publication_1.PublicationObject("1", "gros horloge rouen(mem)", "rouen.jpg", "rue du gros Horloge", null, "2019-07-12", null, "https://fr.wikipedia.org/wiki/Gros-Horloge"));
        this.saveOrUpdate(new publication_1.PublicationObject("2", "chateau de gaillon(mem)", "gaillon.jpg", "chateau gaillon (renaissance)", null, "2019-07-11", null, "http://www.passionchateaux.com/ch_gaillon.htm"));
        this.saveOrUpdate(new publication_1.PublicationObject("3", "tour eiffel(mem)", "tourEiffel.jpg", "tour eiffel (Paris)", "<p> la <b>Tour Eiffel</b> mesure environ 300 mètres </p>", "2019-07-12", null, null));
        this.saveOrUpdate(new publication_1.PublicationObject("4", "Mont Saint Michel(mem)", "montSaintMichel.jpg", "Mont Saint Michel", "<p> le <b>Mont Saint Michel</b> change de couleur très fréquemment </p>", "2019-07-11", null, null));
    }
}
exports.NedbPublicationService = NedbPublicationService;
