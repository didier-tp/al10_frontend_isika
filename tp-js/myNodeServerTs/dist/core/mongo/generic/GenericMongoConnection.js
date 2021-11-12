"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyMongoConnection = void 0;
const mongodb_1 = require("mongodb");
class MyMongoConnection {
    constructor() {
        this.dbUrl = null;
        this.mongoClient = null;
        this.db = null;
        this.initialized = false;
        this.host = null; //"localhost" or ...
        this.port = null; //27017 ou ...
        this.dbName = null; // "test" , "admin" , "db1" , ...
        this.username = null;
        this.password = null;
        this.host = "localhost";
        this.port = 27017;
        this.dbName = "test";
        this.username = null;
        this.password = null;
        let optionalAuthUrlPart = "";
        if (this.username != null && this.password != null) {
            optionalAuthUrlPart = `${this.username}:${this.password}@`;
        }
        this.dbUrl = `mongodb://${optionalAuthUrlPart}${this.host}:${this.port}/${this.dbName}`;
        //openConnection(); should be called AFTER (Promise)
    }
    static getInstance() {
        if (MyMongoConnection.uniqueInstance == null) {
            MyMongoConnection.uniqueInstance = new MyMongoConnection();
        }
        return MyMongoConnection.uniqueInstance;
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
    isInitialized() { return this.initialized; }
}
exports.MyMongoConnection = MyMongoConnection;
MyMongoConnection.uniqueInstance = null;
