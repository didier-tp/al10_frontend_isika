import { Request, Response ,NextFunction, Router} from 'express';
import { Devise } from '../model/devise';
//import { ErrorWithStatus , NotFoundError, ConflictError } from '../error/errorWithStatus';
import { asyncToResp} from './apiHandler';
import { MemDeviseService } from '../core/mem/MemDeviseDataService';
import { DeviseDataService } from '../core/itf/deviseDataService';
import { MongoDeviseService } from '../core/mongo/MongoDeviseDataService';
import { MyAppConfig } from '../config/MyAppConfig';

export const deviseApiRouter = Router();

var  deviseService : DeviseDataService  = initDeviseService()
function initDeviseService() : DeviseDataService {
    if(MyAppConfig.isNoDB())
         return new MemDeviseService();
    else
        return new MongoDeviseService();
}

// .../devise-api/public/devise/EUR ou ...
deviseApiRouter.route('/devise-api/public/devise/:code')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
    let codeDevise = req.params.code;
    let devise = await deviseService.findById(codeDevise)
    return devise;
}));

// http://localhost:8282/devise-api/public/devise renvoyant tout [ {} , {}]
// http://localhost:8282/devise-api/public/devise?changeMini=1.1 renvoyant [{}] selon critere
deviseApiRouter.route('/devise-api/public/devise')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    let  changeMini :number = Number(req.query.changeMini);
    let deviseArray = await deviseService.findAll();
    if(changeMini){
            //filtrage selon critère changeMini:
            deviseArray = deviseArray.filter((dev)=>dev.change >= changeMini);
        }
    return deviseArray;
}));

// .../devise-api/public/convert?source=EUR&target=USD&amount=100 renvoyant { ... } 
deviseApiRouter.route('/devise-api/public/convert')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
    const  codeSrc :string = <any> req.query.source;
    const  codeTarget:string = <any> req.query.target;
    const  amount = Number(req.query.amount);
	//*********** A FAIRE EN TP : **********
    //appeler via await  deviseService.findById(codeSrc); et recuperer
	//le resultat dans deviseSrc 
	//appeler via await  deviseService.findById(codeTarget); et recuperer
	//le resultat dans deviseTarget
    //**************************************
    /*
    const deviseSrc = await deviseService.findById(codeSrc);
    const deviseTarget = await deviseService.findById(codeTarget)
    */
    const [ deviseSrc ,deviseTarget ] = await Promise.all( [ deviseService.findById(codeSrc) , 
                                                             deviseService.findById(codeTarget) ]);
    return { source : codeSrc,
             target : codeTarget,
             amount : amount,
             result : amount * deviseTarget.change / deviseSrc.change
    };
}));


//POST ... with body { "code": "M1" , "nom" : "monnaie1" , "change" : 1.123 }
deviseApiRouter.route('/devise-api/private/role-admin/devise')
.post(asyncToResp(async function(req :Request, res :Response , next: NextFunction ) {
    let  devise :Devise =  req.body ; //as javascript object via jsonParser
    let savedDevise = await deviseService.insert(devise);
                      // await deviseService.saveOrUpdate(devise);
    return savedDevise;
}));

//PUT ... with body { "code": "USD" , "nom" : "dollar" , "change" : 1.1 }
deviseApiRouter.route('/devise-api/private/role-admin/devise')
.put(asyncToResp(async  function(req :Request, res :Response , next: NextFunction ) {
    let  devise :Devise =  req.body ; //as javascript object
    let updatedDevise = await deviseService.update(devise);
    return updatedDevise;
}));

// DELETE http://localhost:8282/devise-api/private/role-admin/devise/EUR
deviseApiRouter.route('/devise-api/private/role-admin/devise/:code')
.delete(asyncToResp(async  function(req :Request, res :Response , next: NextFunction ) {
    let codeDevise = req.params.code;
    await deviseService.deleteById(codeDevise)
    return{ "action" : "devise with code="+codeDevise + " was deleted"};
}));




