"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMongoConnection = void 0;
const db_config_1 = require("../../db-config");
const mongodb_1 = require("mongodb");
const my_db_connection_1 = require("../../my-db-connection");
class MyMongoConnection extends my_db_connection_1.MyAbstractDbConnection {
    constructor(connexionName) {
        super(connexionName);
        this.dbUrl = null;
        this.mongoClient = null;
        this.db = null;
        this.host = null; //"localhost" or ...
        this.port = null; //27017 ou ...
        this.dbName = null; // "test" , "admin" , "db1" , ...
        this.username = null;
        this.password = null;
        let dbCfg = db_config_1.confDbMap[connexionName];
        this.host = dbCfg.host;
        this.port = dbCfg.port;
        this.dbName = dbCfg.database;
        this.username = dbCfg.user;
        this.password = dbCfg.password;
        let optionalAuthUrlPart = "";
        if (this.username != null && this.password != null) {
            optionalAuthUrlPart = `${this.username}:${this.password}@`;
        }
        this.dbUrl = `mongodb://${optionalAuthUrlPart}${this.host}:${this.port}/${this.dbName}`;
        //openConnection(); should be called AFTER (Promise)
    }
    openConnection() {
        console.log("MyMongoConnection, trying openConnection with dbUrl=" + this.dbUrl);
        return new Promise((resolve, reject) => {
            if (this.initialized)
                resolve("mongodb connection already initialized");
            else
                mongodb_1.MongoClient.connect(this.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, mongoCli) => {
                    if (err != null) {
                        reject("mongodb connection fail");
                    }
                    else {
                        this.mongoClient = mongoCli;
                        this.db = this.mongoClient.db(this.dbName);
                        this.initialized = true;
                        resolve("mongodb connection succeed");
                    }
                });
        });
    }
    closeConnection() {
        return this.mongoClient.close();
    }
    currentDb() {
        return this.db;
    }
    currentConnection() {
        return this.currentDb();
    }
}
exports.MyMongoConnection = MyMongoConnection;
