"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemLoginService = void 0;
const GenericMemDataService_1 = require("./generic/GenericMemDataService");
const login_1 = require("../../model/login");
const IdHelper_1 = require("../itf/generic/IdHelper");
// memory Map implementation of LoginDataService 
class MemLoginService extends GenericMemDataService_1.GenericMemDataService {
    constructor() {
        super();
        this.loginIdHelper = new IdHelper_1.StaticIdHelper("username");
        this.idHelper = this.loginIdHelper;
        this.dataMap.set("user1", new login_1.LoginObject("user1", "pwduser1", "user"));
        this.dataMap.set("user2", new login_1.LoginObject("user2", "pwduser2", "user"));
        this.dataMap.set("publisher1", new login_1.LoginObject("publisher1", "pwdpublisher1", "user,publisher"));
        this.dataMap.set("publisher2", new login_1.LoginObject("publisher2", "pwdpublisher2", "publisher"));
        this.dataMap.set("admin1", new login_1.LoginObject("admin1", "pwdadmin1", "admin,user"));
        this.dataMap.set("admin2", new login_1.LoginObject("admin2", "pwdadmin2", "admin"));
    }
}
exports.MemLoginService = MemLoginService;
