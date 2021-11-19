"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GenericMongoDataService_1 = require("./generic/GenericMongoDataService");
// MongoDB implementation of NewsDataService 
class MongoNewsService extends GenericMongoDataService_1.GenericMongoDataService {
    constructor() {
        super("mongo-test", "news" /* ,  new Auto_IdHelper<News,string>("_id") by default */);
    }
}
exports.MongoNewsService = MongoNewsService;
