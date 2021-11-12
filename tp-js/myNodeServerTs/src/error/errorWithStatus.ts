// ErrorWithStatus est une version améliorée de Error (err.message)
// avec un attribut status (404,500,...) permettant une automatisation
// du retour du status http dans le "apiErrorHandler"

//NB: Error is a very special class (native)
//subclass cannot be test with instanceof , ...

export class ErrorWithStatus extends Error {
    public msg : string;
    public status : number
    constructor(message:string,status:number=500){
        super(message);
        this.msg= message;
        this.status=status;
    }
    public static extractStatusInNativeError(e: Error):number{
      let status=500; //500 (Internal Server Error)
      let jsonStr = JSON.stringify(e);
      let errWithStatus = JSON.parse(jsonStr);
      if(errWithStatus.status)
         status = errWithStatus.status;
      return status;
    }
 }

 export class NotFoundError extends ErrorWithStatus{
     constructor(message:string="not found",status:number=404){
         super(message,status);
     }
 }

 export class ConflictError extends ErrorWithStatus{
    constructor(message:string="conflict (with already existing)",status:number=409){
        super(message,status);
    }
}
