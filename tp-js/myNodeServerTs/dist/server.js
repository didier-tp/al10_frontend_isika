"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const bodyParser = (0, tslib_1.__importStar)(require("body-parser"));
exports.app = (0, express_1.default)();
const apiHandler_1 = require("./api/apiHandler");
const globalRoutes_1 = require("./api/globalRoutes");
const deviseApiRoutes_1 = require("./api/deviseApiRoutes");
//import { loginApiRouter } from './api/loginApiRoutes';
//import { verifTokenInHeadersForPrivatePath, secureModeApiRouter } from './api/verif-auth';
const MyAppConfig_1 = require("./config/MyAppConfig");
//PRE TRAITEMENTS (à placer en haut de server.ts)
//support parsing of JSON post data
var jsonParser = bodyParser.json();
exports.app.use(jsonParser);
exports.app.use(bodyParser.urlencoded({
    extended: true
}));
//renvoyer directement les pages statiques rangées dans le répertoire "front-end":
exports.app.use(express_1.default.static('front-end'));
exports.app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//verif auth beared token in request for private api/path:
//app.use(verifTokenInHeadersForPrivatePath);
//ROUTES ORDINAIRES (apres PRE traitements , avant POST traitements)
exports.app.use(globalRoutes_1.globalRouter); //delegate some  global express routes
exports.app.use(deviseApiRoutes_1.deviseApiRouter); //delegate some REST API routes
//app.use(loginApiRouter);  //delegate some REST API routes  
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
    if (MyAppConfig_1.MyAppConfig.isNoDB()) {
        console.log("starting with memoryMap services (no database)");
    }
    console.log("rest express node server listening at " + process.env.PORT);
});
