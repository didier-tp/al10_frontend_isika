"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myAppConnectionMap = exports.MyAppConnectionMap = void 0;
const GenericMongoConnection_1 = require("./mongo/generic/GenericMongoConnection");
const GenericNedbConnection_1 = require("./nedb/generic/GenericNedbConnection");
const my_db_connection_1 = require("./my-db-connection");
class MyAppConnectionMap extends my_db_connection_1.MyAbstractConnectionMap {
    constructor() {
        super();
        this.addConnection(new GenericMongoConnection_1.MyMongoConnection("mongo-test"));
        this.addConnection(new GenericNedbConnection_1.MyNedbPseudoConnectionMap("nedb-test"));
        //this.addConnection(new MyMongoConnection("mongo-cn2"));
        //this.addConnection(new MySequelizeConnection("mysql-cnA"));
    }
    async initConnections() {
        try {
            for (let [name, cn] of this.connectionMap) {
                let connectionMessage = await cn.openConnection();
                console.log("connection " + name + " is ok:" + connectionMessage);
            }
            return true;
        }
        catch (err) {
            console.log("connection error:" + err);
            throw err;
        }
    }
}
exports.MyAppConnectionMap = MyAppConnectionMap;
exports.myAppConnectionMap = new MyAppConnectionMap();
