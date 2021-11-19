"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemPublicationService = void 0;
const GenericMemDataService_1 = require("./generic/GenericMemDataService");
const publication_1 = require("../../model/publication");
const IdHelper_1 = require("../itf/generic/IdHelper");
// memory Map implementation of PublicationDataService 
class MemPublicationService extends GenericMemDataService_1.GenericMemDataService {
    constructor() {
        super();
        this.publicationIdHelper = new IdHelper_1.Auto_IdHelper(); //_id
        this.idHelper = this.publicationIdHelper;
        this.dataMap.set("1", new publication_1.PublicationObject("1", "gros horloge rouen(mem)", "rouen.jpg", "rue du gros Horloge", null, "2019-07-12", null, "https://fr.wikipedia.org/wiki/Gros-Horloge"));
        this.dataMap.set("2", new publication_1.PublicationObject("2", "chateau de gaillon(mem)", "gaillon.jpg", "chateau gaillon (renaissance)", null, "2019-07-11", null, "http://www.passionchateaux.com/ch_gaillon.htm"));
        this.dataMap.set("3", new publication_1.PublicationObject("3", "tour eiffel(mem)", "tourEiffel.jpg", "tour eiffel (Paris)", "<p> la <b>Tour Eiffel</b> mesure environ 300 mètres </p>", "2019-07-12", null, null));
        this.dataMap.set("4", new publication_1.PublicationObject("4", "Mont Saint Michel(mem)", "montSaintMichel.jpg", "Mont Saint Michel", "<p> le <b>Mont Saint Michel</b> change de couleur très fréquemment </p>", "2019-07-11", null, null));
        this.initLastId("4");
        /*PublicationObject(_id , titre, fichier_image_name, resume, texte_complet,
                     date,fichier_details_name,lien_externe)
        */
    }
}
exports.MemPublicationService = MemPublicationService;
