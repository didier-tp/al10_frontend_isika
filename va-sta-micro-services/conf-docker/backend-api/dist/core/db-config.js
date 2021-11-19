"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confDbMap = void 0;
const tslib_1 = require("tslib");
const dbCfg = tslib_1.__importStar(require("./db.cfg.json"));
exports.confDbMap = dbCfg.dev; //or dbCfg.prod
//confDbMap["connexionName1"] , confDbMap["connexionName2"] 
