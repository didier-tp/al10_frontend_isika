import express  from 'express';
import * as bodyParser from 'body-parser';
export const  app :express.Application = express();
import { apiErrorHandler} from './api/apiHandler'
import { globalRouter } from './api/globalRoutes';
import { deviseApiRouter } from './api/deviseApiRoutes';
//import { loginApiRouter } from './api/loginApiRoutes';
//import { verifTokenInHeadersForPrivatePath, secureModeApiRouter } from './api/verif-auth';
import { MyAppConfig } from './config/MyAppConfig';


//PRE TRAITEMENTS (à placer en haut de server.ts)

//support parsing of JSON post data
var jsonParser = bodyParser.json() ;
app.use(jsonParser);

app.use(bodyParser.urlencoded({
    extended: true
  }));



//renvoyer directement les pages statiques rangées dans le répertoire "front-end":
app.use(express.static('front-end'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//verif auth beared token in request for private api/path:
//app.use(verifTokenInHeadersForPrivatePath);

//ROUTES ORDINAIRES (apres PRE traitements , avant POST traitements)

app.use(globalRouter); //delegate some  global express routes
app.use(deviseApiRouter);  //delegate some REST API routes
//app.use(loginApiRouter);  //delegate some REST API routes  

//POST TRAITEMENTS (à placer en bas de server.ts):

app.use(apiErrorHandler); //pour gérer les erreurs/exceptions
                          //automatiquement rattrapées .then().catch() de asyncToResp (api/apiHandler.ts)
         /*exemple : deviseApiRouter.route('/devise/:code')
                        .get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
                            let codeDevise = req.params.code;
                            let devise = await deviseService.findById(codeDevise)
                            return devise; //apiErrorHandler via .catch(next); of asyncToResp
                        }));
*/

export const server = app.listen(process.env.PORT , function () {
    console.log("http://localhost:" + process.env.PORT );        
    if(MyAppConfig.isNoDB()){
      console.log("starting with memoryMap services (no database)"); 
    }	
    console.log("rest express node server listening at " + process.env.PORT);
});