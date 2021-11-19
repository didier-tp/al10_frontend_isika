"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAbstractConnectionMap = exports.MyAbstractDbConnection = void 0;
class MyAbstractDbConnection {
    constructor(name) {
        this.name = name;
        this.initialized = false;
    }
    getName() { return this.name; }
    isInitialized() { return this.initialized; }
}
exports.MyAbstractDbConnection = MyAbstractDbConnection;
class MyAbstractConnectionMap {
    constructor() {
        this.connectionMap = new Map();
    }
    addConnection(cn) {
        this.connectionMap.set(cn.getName(), cn);
    }
    getConnection(name) {
        return this.connectionMap.get(name);
    }
}
exports.MyAbstractConnectionMap = MyAbstractConnectionMap;
