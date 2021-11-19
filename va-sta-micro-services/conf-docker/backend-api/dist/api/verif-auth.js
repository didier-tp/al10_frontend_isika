"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifTokenInHeadersForPrivatePath = exports.secureModeApiRouter = void 0;
const express_1 = require("express");
const apiHandler_1 = require("./apiHandler");
const jwt_util_1 = require("../util/jwt-util");
var secureMode = false; //or true
exports.secureModeApiRouter = express_1.Router();
//setting secureMode to true or false (tp , dev-only)
// GET http://localhost:8282/auth-api/dev-only/set-secure-mode/true or false renvoyant { secureMode : true_or_false}
exports.secureModeApiRouter.route('/auth-api/public/dev-only/set-secure-mode/:mode')
    .get(apiHandler_1.asyncToResp(async function (req, res, next) {
    let mode = req.params.mode;
    secureMode = (mode == "true") ? true : false;
    return { secureMode: secureMode };
}));
//getting current secureMode : true or false (tp , dev-only)
// GET http://localhost:8282/auth-api/dev-only/get-secure-mode renvoyant { secureMode : true_or_false}
exports.secureModeApiRouter.route('/auth-api/public/dev-only/get-secure-mode')
    .get(apiHandler_1.asyncToResp(async function (req, res, next) {
    return { secureMode: secureMode };
}));
function verifTokenInHeadersForPrivatePath(req, res, next) {
    if (secureMode == false || !req.path.includes("/private/"))
        next();
    else
        verifTokenInHeaders(req, res, next); //if secureMode==true
}
exports.verifTokenInHeadersForPrivatePath = verifTokenInHeadersForPrivatePath;
// verif bearer token in Authorization headers of request :
function verifTokenInHeaders(req, res, next) {
    jwt_util_1.extractSubjectWithRolesClaimFromJwtInAuthorizationHeader(req.headers.authorization)
        .then((claim) => {
        if (checkAuthorizedPathFromRolesInJwtClaim(req.path, claim))
            next(); //ok valid jwt and role(s) in claim sufficient for authorize path
        else
            res.status(401).send("Unauthorized (valid jwt but no required role)");
    })
        .catch((err) => { res.status(401).send("Unauthorized " + err ? err : ""); }); //401=Unauthorized or 403=Forbidden
}
function checkAuthorizedPathFromRolesInJwtClaim(path, claim) {
    //console.log("path: " + path);
    //console.log("claim in jwt :" + JSON.stringify(claim));
    if (claim == null)
        return false;
    if (claim.roles == null || claim.roles == "")
        return true; //pas de verif vis à vis des rôles (simple jwt valide)
    let arrayUserRoles = claim.roles.split(',');
    // authorize path including /private/role_xxx/ if xxx in arrayUserRoles
    let authorized = false;
    for (let role of arrayUserRoles) {
        if (path.includes("/private/role_" + role + "/"))
            authorized = true;
    }
    return authorized;
}
