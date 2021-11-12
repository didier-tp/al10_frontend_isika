"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericMemDataService = void 0;
const IdHelper_1 = require("../../itf/generic/IdHelper");
const errorWithStatus_1 = require("../../../error/errorWithStatus");
class GenericMemDataService {
    constructor() {
        this.lastId = 0; //if ID=number (or number in string) and idHelper.isAuto() only
        this.dataMap = new Map(); //empty map
        //may be replaced/override in subclass:
        this.idHelper = new IdHelper_1.AutoIdHelper(); //.id
    }
    initLastId(lastId = null) {
        if (typeof this.lastId == "number") {
            this.lastId = lastId;
        }
        else {
            this.lastId = Number(this.lastId);
        }
    }
    incrementLastId() {
        if (typeof this.lastId == "number") {
            this.lastId++;
            return this.lastId;
        }
        else {
            this.lastId = 1 + Number(this.lastId);
            return ("" + this.lastId);
        }
    }
    insert(dataObj) {
        return new Promise((resolve, reject) => {
            let id = this.idHelper.extractId(dataObj);
            if (!this.idHelper.isAuto() && id == null)
                reject(new Error("entity must have a valid defined id , no auto_incr"));
            if (this.idHelper.isAuto() && id == null) {
                id = this.incrementLastId();
                this.idHelper.setId(dataObj, id);
            }
            // console.log("in insert() , dataObj="+JSON.stringify(dataObj) + " and id="+id);
            this.dataMap.set(id, dataObj);
            resolve(dataObj);
        });
    }
    saveOrUpdate(dataObj) {
        //console.log("in saveOrUpdate() , dataObj="+JSON.stringify(dataObj));
        return new Promise((resolve, reject) => {
            let id = this.idHelper.extractId(dataObj);
            if (this.idHelper.isAuto() && id == null) {
                this.insert(dataObj).then((data) => { resolve(data); }, (ex) => { reject(ex); });
            }
            else {
                this.update(dataObj).then((data) => { resolve(data); }, (ex) => { reject(ex); });
            }
        });
    }
    update(dataObj) {
        return new Promise((resolve, reject) => {
            let id = this.idHelper.extractId(dataObj);
            //console.log("in update() , dataObj="+JSON.stringify(dataObj) + " and id="+id);
            this.dataMap.set(id, dataObj);
            resolve(dataObj);
        });
    }
    deleteById(id) {
        return new Promise((resolve, reject) => {
            if (this.dataMap.has(id)) {
                this.dataMap.delete(id);
                resolve();
            }
            else {
                reject(new errorWithStatus_1.NotFoundError("not found for delete"));
            }
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            if (this.dataMap.has(id)) {
                let dataObj = this.dataMap.get(id);
                resolve(dataObj);
            }
            else {
                reject(new errorWithStatus_1.NotFoundError("not found (id=" + id + ")"));
            }
        });
    }
    findAll() {
        return new Promise((resolve, reject) => {
            let allDataIterables = this.dataMap.values();
            let allDataArray = [...allDataIterables];
            resolve(allDataArray);
        });
    }
    findOne(query) {
        throw new Error("Method not implemented.");
    }
    findList(query) {
        throw new Error("Method not implemented.");
    }
    remove(query) {
        throw new Error("Method not implemented.");
    }
}
exports.GenericMemDataService = GenericMemDataService;
