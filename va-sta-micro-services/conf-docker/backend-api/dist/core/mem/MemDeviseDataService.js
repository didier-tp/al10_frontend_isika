"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemDeviseService = void 0;
const GenericMemDataService_1 = require("./generic/GenericMemDataService");
const devise_1 = require("../../model/devise");
const IdHelper_1 = require("../itf/generic/IdHelper");
// memory Map implementation of DeviseDataService 
class MemDeviseService extends GenericMemDataService_1.GenericMemDataService {
    constructor() {
        super();
        this.deviseIdHelper = new IdHelper_1.StaticIdHelper("code");
        this.idHelper = this.deviseIdHelper;
        this.dataMap.set("USD", new devise_1.DeviseObject("USD", "Dollar", 1));
        this.dataMap.set("EUR", new devise_1.DeviseObject("EUR", "Euro", 0.91));
        this.dataMap.set("GBP", new devise_1.DeviseObject("GBP", "Livre", 0.81));
        this.dataMap.set("JPY", new devise_1.DeviseObject("JPY", "Yen", 132.01));
    }
}
exports.MemDeviseService = MemDeviseService;
