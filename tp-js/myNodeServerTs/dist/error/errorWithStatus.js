"use strict";
// ErrorWithStatus est une version améliorée de Error (err.message)
// avec un attribut status (404,500,...) permettant une automatisation
// du retour du status http dans le "apiErrorHandler"
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.NotFoundError = exports.ErrorWithStatus = void 0;
//NB: Error is a very special class (native)
//subclass cannot be test with instanceof , ...
class ErrorWithStatus extends Error {
    constructor(message, status = 500) {
        super(message);
        this.msg = message;
        this.status = status;
    }
    static extractStatusInNativeError(e) {
        let status = 500; //500 (Internal Server Error)
        let jsonStr = JSON.stringify(e);
        let errWithStatus = JSON.parse(jsonStr);
        if (errWithStatus.status)
            status = errWithStatus.status;
        return status;
    }
}
exports.ErrorWithStatus = ErrorWithStatus;
class NotFoundError extends ErrorWithStatus {
    constructor(message = "not found", status = 404) {
        super(message, status);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends ErrorWithStatus {
    constructor(message = "conflict (with already existing)", status = 409) {
        super(message, status);
    }
}
exports.ConflictError = ConflictError;
