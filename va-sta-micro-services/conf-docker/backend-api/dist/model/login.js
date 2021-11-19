"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginObject = void 0;
//export type LoginItf = Login ; /* simple type alias */
//real class for instanciation ,  with constructor .
class LoginObject {
    constructor(username = null, password = null, roles = null) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }
}
exports.LoginObject = LoginObject;
