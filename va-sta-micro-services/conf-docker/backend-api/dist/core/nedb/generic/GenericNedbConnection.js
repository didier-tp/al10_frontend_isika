"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyNedbPseudoConnectionMap = void 0;
const db_config_1 = require("../../db-config");
const Nedb = require("nedb");
const my_db_connection_1 = require("../../my-db-connection");
class MyNedbPseudoConnectionMap extends my_db_connection_1.MyAbstractDbConnection {
    constructor(connexionName) {
        super(connexionName);
        //private  db : Nedb =null; pas unique mais un db/nedb par collection/datastore !!!
        //NB: l'à peu près équivalent neDB d'une collection "mongoDB" 
        //est appelé "datastore" dans NeDB et correspond à une instance
        //de Nedb
        this.neDbMap = new Map(); //empty datastore/collection map
        this.neDbPathPrefix = null; // "test" , "admin" , "db1" , ...
        let dbCfg = db_config_1.confDbMap[connexionName];
        this.neDbPathPrefix = "./" + dbCfg.database;
    }
    openConnection(collectionOrStoreName = "default") {
        let neDbPath = this.neDbPathPrefix + "/" + collectionOrStoreName + ".store.db";
        console.log("MyNedbPseudoConnectionMap, trying openConnection with neDbPath=" + neDbPath);
        return new Promise((resolve, reject) => {
            if (this.neDbMap.get(collectionOrStoreName) != null)
                resolve("neDb connection already initialized for collectionOrStoreName=" + collectionOrStoreName);
            else {
                let db = new Nedb({ filename: neDbPath });
                this.neDbMap.set(collectionOrStoreName, db);
                db.loadDatabase((err) => {
                    if (err != null) {
                        reject("nedb connection fail");
                    }
                    else {
                        resolve("nedb connection succeed with path=" + neDbPath);
                    }
                });
            }
        });
    }
    closeConnection() {
        return Promise.resolve(); //nothing to close with nedb (?)
    }
    currentDb() {
        return this.neDbMap;
    }
    currentConnection() {
        return this.currentDb();
    }
}
exports.MyNedbPseudoConnectionMap = MyNedbPseudoConnectionMap;
