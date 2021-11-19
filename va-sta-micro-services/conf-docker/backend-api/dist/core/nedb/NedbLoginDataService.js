"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NedbLoginService = void 0;
const GenericNedbDataService_1 = require("./generic/GenericNedbDataService");
const login_1 = require("../../model/login");
const IdHelper_1 = require("../itf/generic/IdHelper");
// MongoDB implementation of LoginDataService 
class NedbLoginService extends GenericNedbDataService_1.GenericNedbDataService {
    constructor() {
        super("nedb-test", "login", new IdHelper_1.StaticIdHelper("username"));
        this.saveOrUpdate(new login_1.LoginObject("user1", "pwduser1", "user"));
        this.saveOrUpdate(new login_1.LoginObject("user2", "pwduser2", "user"));
        this.saveOrUpdate(new login_1.LoginObject("publisher1", "pwdpublisher1", "user,publisher"));
        this.saveOrUpdate(new login_1.LoginObject("publisher2", "pwdpublisher2", "publisher"));
        this.saveOrUpdate(new login_1.LoginObject("admin1", "pwdadmin1", "admin,user"));
        this.saveOrUpdate(new login_1.LoginObject("admin2", "pwdadmin2", "admin"));
    }
}
exports.NedbLoginService = NedbLoginService;
