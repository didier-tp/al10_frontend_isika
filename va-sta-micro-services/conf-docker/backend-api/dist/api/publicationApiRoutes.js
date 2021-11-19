"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicationApiRouter = void 0;
const express_1 = require("express");
const MongoPublicationDataService_1 = require("../core/mongo/MongoPublicationDataService");
const apiHandler_1 = require("./apiHandler");
const MyAppConfig_1 = require("../config/MyAppConfig");
const NedbPublicationDataService_1 = require("../core/nedb/NedbPublicationDataService");
var publicationService = initPublicationService();
function initPublicationService() {
    if (MyAppConfig_1.MyAppConfig.isNoDB())
        //return new MemPublicationService();
        return new NedbPublicationDataService_1.NedbPublicationService();
    else
        return new MongoPublicationDataService_1.MongoPublicationService();
}
exports.publicationApiRouter = express_1.Router();
// http://localhost:8282/news-api/public/publication renvoyant tout [ {} , {}]
// http://localhost:8282/news-api/public/publication?... renvoyant [{}] selon critere
exports.publicationApiRouter.route('/news-api/public/publication')
    .get(apiHandler_1.asyncToResp(async function (req, res, next) {
    //let  critereXy = req.query.critereXy;
    let pubArray = await publicationService.findAll();
    return pubArray;
}));
// DELETE http://localhost:8282/news-api/private/role_publisher/publication/xyz
exports.publicationApiRouter.route('/news-api/private/role_publisher/publication/:idPub')
    .delete(apiHandler_1.asyncToResp(async function (req, res, next) {
    let idPub = req.params.idPub;
    await publicationService.deleteById(idPub);
    return { "action": "publication with idPub=" + idPub + " was deleted" };
}));
//{  titre : "" , fichier_image : null ,  resume : "" , fichier_details_name : null , texte_complet : null , lien_externe : null , date : "2018-06-01"};
// POST : SAVE or UPDATE
exports.publicationApiRouter.route('/news-api/private/role_publisher/upload_publication')
    .post(apiHandler_1.asyncToResp(async function (req, res, next) {
    var publication = JSON.parse(req.body.publication); // explicit JSON.parse() needed here because multipart / formData / upload
    //console.log("posting or reposting new publication :" +JSON.stringify(publication));
    if (!req.files) {
        //console.log('No files were uploaded.');
    }
    else {
        // req.files.fileNameXyz (ici .imageFile et .detailsFile) 
        let imageFile = req.files.imageFile;
        if (imageFile) {
            // Use the mv() method to place the file somewhere on your server
            imageFile.mv('./front-end/posts/images/' + imageFile.name, function (err) {
                if (err)
                    console.log(imageFile.name + " was not upload");
                else
                    console.log(imageFile.name + " was upload in ./front-end/posts/images");
            });
        }
        let detailsFile = req.files.detailsFile;
        if (detailsFile) {
            // Use the mv() method to place the file somewhere on your server
            detailsFile.mv('./front-end/posts/' + detailsFile.name, function (err) {
                if (err)
                    console.log(detailsFile.name + " was not upload");
                else
                    console.log(detailsFile.name + " was upload in ./front-end/posts/");
            });
        }
    }
    if (publication) { // POST : SAVE or UPDATE
        let savedPublication = await publicationService.saveOrUpdate(publication);
        return savedPublication;
    }
}));
