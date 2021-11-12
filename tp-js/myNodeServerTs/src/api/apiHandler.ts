import  { Request, Response ,NextFunction, ErrorRequestHandler} from 'express';
import { ErrorWithStatus } from '../error/errorWithStatus';


export  const apiErrorHandler : ErrorRequestHandler = 
 function (err: any,  req:Request, res: Response, next: NextFunction) {
    //console.log("in apiErrorHandler err=", err + " " + JSON.stringify(err));
    //console.log("in apiErrorHandler typeof err=",typeof err);
    if(typeof err == 'string'){
        res.status(500).json({errorCode:'500', message: 'Internal Server Error :' + err});
    }
    else if(err instanceof Error){
        //console.log("in apiErrorHandler err is instanceof Error");
        let status = ErrorWithStatus.extractStatusInNativeError(err);
        res.status(status).json(
            {errorCode:`${status}`, message: err.message});
    }
    else
      res.status(500).json({errorCode:'500', message: 'Internal Server Error'});
}

export function asyncToResp(fn : Function) {
    return function(req :Request, res :Response , next: NextFunction) {
      // Make sure to `.catch()` any errors and pass them along to the `next()`
      // middleware in the chain, in this case the error handler.
      fn(req, res, next)
      .then((data:object)=> { res.send(data) })
      .catch(next);
    };
  }

  //exemple d'utilisation:
  /*
deviseApiRouter.route('/devise/:code')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
    let codeDevise = req.params.code;
    let devise = await deviseService.findById(codeDevise)
    return devise;
}));
  */