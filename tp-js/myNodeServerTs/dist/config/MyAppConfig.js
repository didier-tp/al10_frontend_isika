"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAppConfig = void 0;
class MyAppConfig {
    static initialize() {
        if (process.argv.includes("--noDB")) {
            MyAppConfig.noDB = true;
        }
        else {
            MyAppConfig.noDB = false;
        }
    }
    static isNoDB() {
        if (MyAppConfig.noDB == null) {
            MyAppConfig.initialize();
        }
        return MyAppConfig.noDB;
    }
}
exports.MyAppConfig = MyAppConfig;
MyAppConfig.noDB = null;
