"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const fileUpload = require('express-fileupload');
exports.app = express_1.default();
const apiHandler_1 = require("./api/apiHandler");
const globalRoutes_1 = require("./api/globalRoutes");
const deviseApiRoutes_1 = require("./api/deviseApiRoutes");
const publicationApiRoutes_1 = require("./api/publicationApiRoutes");
const loginApiRoutes_1 = require("./api/loginApiRoutes");
const verif_auth_1 = require("./api/verif-auth");
const MyAppConfig_1 = require("./config/MyAppConfig");
//PRE TRAITEMENTS (à placer en haut de server.ts)
//support parsing of JSON post data
var jsonParser = bodyParser.json();
exports.app.use(jsonParser);
exports.app.use(bodyParser.urlencoded({
    extended: true
}));
//support for fileUpload:
exports.app.use(fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
}));
//renvoyer directement les pages statiques rangées dans le répertoire "front-end":
exports.app.use(express_1.default.static('front-end'));
exports.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//verif auth beared token in request for private api/path:
exports.app.use(verif_auth_1.verifTokenInHeadersForPrivatePath);
//ROUTES ORDINAIRES (apres PRE traitements , avant POST traitements)
exports.app.use(globalRoutes_1.globalRouter); //delegate some  global express routes
exports.app.use(verif_auth_1.secureModeApiRouter); //dev-only ( http://localhost:8282/auth-api/dev-only/secure/true or false)
exports.app.use(deviseApiRoutes_1.deviseApiRouter); //delegate some REST API routes
exports.app.use(publicationApiRoutes_1.publicationApiRouter); //delegate some REST API routes
exports.app.use(loginApiRoutes_1.loginApiRouter); //delegate some REST API routes  
//POST TRAITEMENTS (à placer en bas de server.ts):
exports.app.use(apiHandler_1.apiErrorHandler); //pour gérer les erreurs/exceptions
//automatiquement rattrapées .then().catch() de asyncToResp (api/apiHandler.ts)
/*exemple : deviseApiRouter.route('/devise/:code')
               .get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
                   let codeDevise = req.params.code;
                   let devise = await deviseService.findById(codeDevise)
                   return devise; //apiErrorHandler via .catch(next); of asyncToResp
               }));
*/
exports.server = exports.app.listen(process.env.PORT, function () {
    console.log("http://localhost:" + process.env.PORT);
    //console.log("process.argv="+ process.argv);
    if (MyAppConfig_1.MyAppConfig.isNoDB()) {
        console.log("starting with memoryMap services (no database)");
    }
    else {
        /*
        //if not called here , initConnections() will be deffered (lazy)
        myAppConnectionMap.initConnections()
                          .then((bOk)=>{ console.log("database connections is ok"); });
        */
    }
    console.log("rest express node server listening at " + process.env.PORT);
});
