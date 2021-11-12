"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncToResp = exports.apiErrorHandler = void 0;
const errorWithStatus_1 = require("../error/errorWithStatus");
const apiErrorHandler = function (err, req, res, next) {
    //console.log("in apiErrorHandler err=", err + " " + JSON.stringify(err));
    //console.log("in apiErrorHandler typeof err=",typeof err);
    if (typeof err == 'string') {
        res.status(500).json({ errorCode: '500', message: 'Internal Server Error :' + err });
    }
    else if (err instanceof Error) {
        //console.log("in apiErrorHandler err is instanceof Error");
        let status = errorWithStatus_1.ErrorWithStatus.extractStatusInNativeError(err);
        res.status(status).json({ errorCode: `${status}`, message: err.message });
    }
    else
        res.status(500).json({ errorCode: '500', message: 'Internal Server Error' });
};
exports.apiErrorHandler = apiErrorHandler;
function asyncToResp(fn) {
    return function (req, res, next) {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next)
            .then((data) => { res.send(data); })
            .catch(next);
    };
}
exports.asyncToResp = asyncToResp;
//exemple d'utilisation:
/*
deviseApiRouter.route('/devise/:code')
.get(asyncToResp(async function(req :Request, res :Response , next: NextFunction){
  let codeDevise = req.params.code;
  let devise = await deviseService.findById(codeDevise)
  return devise;
}));
*/ 
