"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviseApiRouter = void 0;
const express_1 = require("express");
//import { ErrorWithStatus , NotFoundError, ConflictError } from '../error/errorWithStatus';
const apiHandler_1 = require("./apiHandler");
const MongoDeviseDataService_1 = require("../core/mongo/MongoDeviseDataService");
const NedbDeviseDataService_1 = require("../core/nedb/NedbDeviseDataService");
const MyAppConfig_1 = require("../config/MyAppConfig");
exports.deviseApiRouter = express_1.Router();
var deviseService = initDeviseService();
function initDeviseService() {
    if (MyAppConfig_1.MyAppConfig.isNoDB())
        //return new MemDeviseService();
        return new NedbDeviseDataService_1.NedbDeviseService();
    else
        //return new NedbDeviseService();
        return new MongoDeviseDataService_1.MongoDeviseService();
}
// .../devise-api/public/devise/EUR ou ...
exports.deviseApiRouter.route('/devise-api/public/devise/:code')
    .get(apiHandler_1.asyncToResp(async function (req, res, next) {
    let codeDevise = req.params.code;
    let devise = await deviseService.findById(codeDevise);
    return devise;
}));
// http://localhost:8282/devise-api/public/devise renvoyant tout [ {} , {}]
// http://localhost:8282/devise-api/public/devise?changeMini=1.1 renvoyant [{}] selon critere
exports.deviseApiRouter.route('/devise-api/public/devise')
    .get(apiHandler_1.asyncToResp(async function (req, res, next) {
    let changeMini = req.query.changeMini;
    let deviseArray = await deviseService.findAll();
    if (changeMini) {
        //filtrage selon critère changeMini:
        deviseArray = deviseArray.filter((dev) => dev.change >= changeMini);
    }
    return deviseArray;
}));
// .../devise-api/public/convert?source=EUR&target=USD&amount=100 renvoyant { ... } 
exports.deviseApiRouter.route('/devise-api/public/convert')
    .get(apiHandler_1.asyncToResp(async function (req, res, next) {
    const codeSrc = req.query.source;
    const codeTarget = req.query.target;
    const amount = Number(req.query.amount);
    const deviseSrc = await deviseService.findById(codeSrc);
    const deviseTarget = await deviseService.findById(codeTarget);
    return { source: codeSrc,
        target: codeTarget,
        amount: amount,
        result: amount * deviseTarget.change / deviseSrc.change
    };
}));
//POST ... with body { "code": "M1" , "name" : "monnaie1" , "change" : 1.123 }
exports.deviseApiRouter.route('/devise-api/private/role_admin/devise')
    .post(apiHandler_1.asyncToResp(async function (req, res, next) {
    let devise = req.body; //as javascript object via jsonParser
    let savedDevise = await deviseService.insert(devise);
    // await deviseService.saveOrUpdate(devise);
    return savedDevise;
}));
//PUT ... with body { "code": "USD" , "nom" : "dollar" , "change" : 1.1 }
exports.deviseApiRouter.route('/devise-api/private/role_admin/devise')
    .put(apiHandler_1.asyncToResp(async function (req, res, next) {
    let devise = req.body; //as javascript object
    let updatedDevise = await deviseService.update(devise);
    return updatedDevise;
}));
// DELETE http://localhost:8282/devise-api/private/role_admin/devise/EUR
exports.deviseApiRouter.route('/devise-api/private/role_admin/devise/:code')
    .delete(apiHandler_1.asyncToResp(async function (req, res, next) {
    let codeDevise = req.params.code;
    await deviseService.deleteById(codeDevise);
    return { "action": "devise with code=" + codeDevise + " was deleted" };
}));
