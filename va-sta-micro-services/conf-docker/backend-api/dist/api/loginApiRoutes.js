"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginApiRouter = void 0;
const express_1 = require("express");
//import { ErrorWithStatus , NotFoundError, ConflictError } from '../error/errorWithStatus';
const apiHandler_1 = require("./apiHandler");
const MemLoginDataService_1 = require("../core/mem/MemLoginDataService");
const jwt_util_1 = require("../util/jwt-util");
exports.loginApiRouter = express_1.Router();
var loginService = new MemLoginDataService_1.MemLoginService();
//getting all login (tp , admin only)
// GET http://localhost:8282/login-api/private/role_admin/login renvoyant tout [ {} , {}]
exports.loginApiRouter.route('/login-api/private/role_admin/login')
    .get(apiHandler_1.asyncToResp(async function (req, res, next) {
    //let  critereXy = req.query.critereXy;
    let loginArray = await loginService.findAll();
    return loginArray;
}));
//submitting authRequest (login) via post
//response = authResponse with token:
exports.loginApiRouter.route('/login-api/public/auth')
    .post(apiHandler_1.asyncToResp(async function (req, res, next) {
    let authReq = req.body; //as javascript object via jsonParser
    let authResponse = { username: authReq.username,
        status: null, message: null,
        token: null, roles: null };
    let login = null;
    try {
        login = await loginService.findById(authReq.username);
    }
    catch (err) {
        authResponse.message = err.message;
    }
    if (login == null) {
        authResponse.message = "login failed (wrong username)";
        authResponse.status = false;
    }
    else if (login.password == authReq.password) {
        let arrayUserRoles = login.roles.split(',');
        let arrayAskedRoles = authReq.roles.split(',');
        let okRoles = true;
        for (let askedRole of arrayAskedRoles) {
            if (!arrayUserRoles.includes(askedRole))
                okRoles = false;
        }
        if (okRoles == true) {
            authResponse.message = "successful login";
            authResponse.status = true;
            authResponse.roles = authReq.roles;
            authResponse.token = jwt_util_1.buildJwtToken(authReq.username, authReq.roles);
        }
        else {
            authResponse.message = "login failed (good username/password but no asked roles=" + authReq.roles + ")";
            authResponse.status = false;
        }
    }
    else {
        authResponse.message = "login failed (wrong password)";
        authResponse.status = false;
    }
    return authResponse;
}));
//posting new user account:
//POST ... with body { "username": "u1" , "password" : "pwdu1" , "roles" : "user" }
exports.loginApiRouter.route('/login-api/private/role_admin/login')
    .post(apiHandler_1.asyncToResp(async function (req, res, next) {
    let login = req.body; //as javascript object via jsonParser
    let savedLogin = await loginService.insert(login);
    return savedLogin;
}));
//updating existing user account:
//PUT ... with body { "username": "u1" , "password" : "pwdU1" , "roles" : "user" }
exports.loginApiRouter.route('/login-api/private/role_admin/login')
    .put(apiHandler_1.asyncToResp(async function (req, res, next) {
    let login = req.body; //as javascript object
    let updatedLogin = await loginService.update(login);
    return updatedLogin;
}));
// DELETE http://localhost:8282/login-api/private/role_admin/login/user1
exports.loginApiRouter.route('/login-api/private/role_admin/login/:username')
    .delete(apiHandler_1.asyncToResp(async function (req, res, next) {
    let username = req.params.username;
    await loginService.deleteById(username);
    return { "action": "Login with username=" + username + " was deleted" };
}));
