"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//export type PublicationItf = Publication; /* simple type alias */
//real class for instanciation ,  with constructor .
class PublicationObject {
    constructor(_id = null, titre = "titre ?", fichier_image_name = null, resume = null, texte_complet = null, date = null, fichier_details_name = null, lien_externe = null) {
        this._id = _id;
        this.titre = titre;
        this.fichier_image_name = fichier_image_name;
        this.resume = resume;
        this.texte_complet = texte_complet;
        this.date = date;
        this.fichier_details_name = fichier_details_name;
        this.lien_externe = lien_externe;
    }
}
exports.PublicationObject = PublicationObject;
