"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDeviseService = void 0;
const GenericMongoDataService_1 = require("./generic/GenericMongoDataService");
const IdHelper_1 = require("../itf/generic/IdHelper");
// MongoDB implementation of DeviseDataService 
class MongoDeviseService extends GenericMongoDataService_1.GenericMongoDataService {
    constructor() {
        super("devises", new IdHelper_1.StaticIdHelper("code"));
    }
}
exports.MongoDeviseService = MongoDeviseService;
