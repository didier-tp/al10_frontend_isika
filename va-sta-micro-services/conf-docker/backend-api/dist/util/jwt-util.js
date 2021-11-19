"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSubjectWithRolesClaimFromJwtInAuthorizationHeader = exports.extractSubjectWithRolesClaimFromJwt = exports.buildJwtToken = void 0;
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const MY_DEFAULT_JWT_ISSUER = "http://www.mycompany";
const MY_DEFAULT_JWT_SECRECT = "MyJWTSuperSecretKey";
const MY_DEFAULT_JWT_EXPIRATION = 2 * 60 * 60; //2heures
function buildJwtToken(userName, roleNames, jwtSecret = MY_DEFAULT_JWT_SECRECT, jwtExpirationInS = MY_DEFAULT_JWT_EXPIRATION) {
    //exemples: jwtExpirationInS=60*05= 300s pour 5minutes
    // jwtExpirationInS=60*15= 900s pour 15minutes
    // jwtExpirationInS=60*30=1800s pour 30minutes
    // jwtExpirationInS=60*60=3600s pour 60minutes
    // jwtExpirationInS=60*120=7200s pour 120minutes
    // usernameOrId="user1"
    // jwtSecret="MyJWTSuperSecretKey"
    // roleNames="user,admin"
    let jwtToken = null;
    let claim = {
        subject: userName,
        roles: roleNames
    };
    let options = {
        issuer: MY_DEFAULT_JWT_ISSUER,
        expiresIn: jwtExpirationInS
    };
    // sign with default (HMAC SHA256)
    jwtToken = jwt.sign(claim, jwtSecret, options);
    return jwtToken;
}
exports.buildJwtToken = buildJwtToken;
function extractSubjectWithRolesClaimFromJwt(jwtToken, jwtSecret = MY_DEFAULT_JWT_SECRECT) {
    return new Promise((resolve, reject) => {
        jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
            const claim = decoded;
            if (err == null) {
                resolve(claim);
            }
            else {
                reject("wrong token " + err);
            }
        });
    });
}
exports.extractSubjectWithRolesClaimFromJwt = extractSubjectWithRolesClaimFromJwt;
function extractSubjectWithRolesClaimFromJwtInAuthorizationHeader(authorizationHeader) {
    return new Promise((resolve, reject) => {
        if (authorizationHeader != null) {
            if (authorizationHeader.startsWith("Bearer")) {
                var token = authorizationHeader.substring(7);
                //console.log("extracted (jwt) token:" + token);
                if (token != null && token.length > 0) {
                    extractSubjectWithRolesClaimFromJwt(token)
                        .then((claim) => { resolve(claim); })
                        .catch((err) => { reject(err); });
                }
                else
                    reject("no or empty token");
            }
            else
                reject("no Bearer token in authorizationHeader");
        }
        else
            reject("no authorizationHeader");
    }); //end of new Promise(() => { });
}
exports.extractSubjectWithRolesClaimFromJwtInAuthorizationHeader = extractSubjectWithRolesClaimFromJwtInAuthorizationHeader;
