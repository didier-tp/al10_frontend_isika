"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NedbDeviseService = void 0;
const GenericNedbDataService_1 = require("./generic/GenericNedbDataService");
const devise_1 = require("../../model/devise");
const IdHelper_1 = require("../itf/generic/IdHelper");
// MongoDB implementation of DeviseDataService 
class NedbDeviseService extends GenericNedbDataService_1.GenericNedbDataService {
    constructor() {
        super("nedb-test", "devises", new IdHelper_1.StaticIdHelper("code"));
        this.saveOrUpdate(new devise_1.DeviseObject("USD", "Dollar", 1));
        this.saveOrUpdate(new devise_1.DeviseObject("EUR", "Euro", 0.92));
        this.saveOrUpdate(new devise_1.DeviseObject("GBP", "Livre", 0.82));
        this.saveOrUpdate(new devise_1.DeviseObject("JPY", "Yen", 132.02));
    }
}
exports.NedbDeviseService = NedbDeviseService;
