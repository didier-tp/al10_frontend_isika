"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticIdHelper = exports.Auto_IdHelper = exports.AutoIdHelper = void 0;
class AbstractIdHelper {
    constructor(idPropName, auto) {
        this.idPropName = idPropName;
        this.auto = auto;
    }
    extractId(e) {
        return Reflect.get(e, this.idPropName);
    }
    setId(e, id) {
        Reflect.set(e, this.idPropName, id);
    }
    isAuto() {
        return this.auto;
    }
    getIdPropName() {
        return this.idPropName;
    }
}
class AutoIdHelper extends AbstractIdHelper {
    constructor(idPropName = "id") {
        super(idPropName, true);
    }
}
exports.AutoIdHelper = AutoIdHelper;
class Auto_IdHelper extends AbstractIdHelper {
    constructor(idPropName = "_id") {
        super(idPropName, true);
    }
}
exports.Auto_IdHelper = Auto_IdHelper;
class StaticIdHelper extends AbstractIdHelper {
    constructor(idPropName = "id") {
        super(idPropName, false);
    }
}
exports.StaticIdHelper = StaticIdHelper;
