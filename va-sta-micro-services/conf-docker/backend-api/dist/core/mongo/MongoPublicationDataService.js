"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoPublicationService = void 0;
const GenericMongoDataService_1 = require("./generic/GenericMongoDataService");
// MongoDB implementation of NewsDataService 
class MongoPublicationService extends GenericMongoDataService_1.GenericMongoDataService {
    constructor() {
        super("mongo-test", "pubs" /* ,  new Auto_IdHelper<Publication,string>("_id") by default */);
    }
}
exports.MongoPublicationService = MongoPublicationService;
