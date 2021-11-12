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
.get(function(req :Request, res :Response , next: NextFunction){
    let codeDevise = req.params.code;
    //appeler deviseService.findById(codeDevise)
    //renvoyer  devise via res.send() dans .then();
    deviseService.findById(codeDevise)
    .then((devise)=>{ res.send(devise);} )
    .catch((err)=>{ res.status(404).send(err);})
});

// http://localhost:8282/devise-api/public/devise renvoyant tout [ {} , {}]
// http://localhost:8282/devise-api/public/devise?changeMini=1.1 renvoyant [{}] selon critere
deviseApiRouter.route('/devise-api/public/devise')
.get(function(req :Request, res :Response , next: NextFunction ) {
    let  changeMini :number = Number(req.query.changeMini);
    //appeler  deviseService.findAll();
    //renvoyer  deviseArray via res.send() dans .then();
    deviseService.findAll()
    .then((deviseArray)=>{ res.send(deviseArray);} )
    .catch((err)=>{ res.status(404).send( err );})
});

// .../devise-api/public/convert?source=EUR&target=USD&amount=100 renvoyant { ... } 
deviseApiRouter.route('/devise-api/public/convert')
.get(async function(req :Request, res :Response , next: NextFunction){
    const  codeSrc :string = <any> req.query.source;
    const  codeTarget:string = <any> req.query.target;
    const  amount = Number(req.query.amount);
    //appeler deviseService.findById(codeSrc);
    //appeler  deviseService.findById(codeTarget) dans premier .then()
    //renvoyer la chose ci-après via res.send() dans second  .then(); 
	let deviseSrc : Devise=null;
    deviseService.findById(codeSrc)
    .then( (deviseSource)=>{ deviseSrc = deviseSource;
                             return deviseService.findById(codeTarget);} )
    .then((deviseTarget) => { res.send(
                                        { source : codeSrc,
                                          target : codeTarget,
                                          amount : amount,
                                        result : amount * deviseTarget.change / deviseSrc.change
                                        });
     })
     .catch((err)=>{ res.status(500).send(err );})
});


//POST ... with body { "code": "M1" , "nom" : "monnaie1" , "change" : 1.123 }
deviseApiRouter.route('/devise-api/private/role-admin/devise')
.post(function(req :Request, res :Response , next: NextFunction ) {
    let  devise :Devise =  req.body ; //as javascript object via jsonParser
    //appeler deviseService.insert(devise);
    //renvoyer  savedDevise via res.send() dans .then();
    deviseService.insert(devise)
    .then((savedDevise)=>{ res.send(savedDevise);} )
    .catch((err)=>{ res.status(500).send(  err );})
});

//PUT ... with body { "code": "USD" , "nom" : "dollar" , "change" : 1.1 }
deviseApiRouter.route('/devise-api/private/role-admin/devise')
.put(function(req :Request, res :Response , next: NextFunction ) {
    let  devise :Devise =  req.body ; //as javascript object
	//appeler deviseService.update(devise);
    //renvoyer  updatedDevise via res.send() dans .then();
    deviseService.update(devise)
    .then((updatedDevise)=>{ res.send(updatedDevise);} )
    .catch((err)=>{ res.status(500).send( err );})
});

// DELETE http://localhost:8282/devise-api/private/role_admin/devise/EUR
deviseApiRouter.route('/devise-api/private/role-admin/devise/:code')
.delete(function(req :Request, res :Response , next: NextFunction ) {
    let codeDevise = req.params.code;
    //appeler  deviseService.deleteById(codeDevise)
    //renvoyer la chose ci-après via res.send() dans .then();
    deviseService.deleteById(codeDevise)
	.then ( () => {
        res.send({ "action" : "devise with code="+codeDevise + " was deleted"});
       })
    .catch((err)=>{ res.status(500).send(err);})
});




