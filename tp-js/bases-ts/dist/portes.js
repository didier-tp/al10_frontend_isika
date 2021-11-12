"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
var Porte = /** @class */ (function () {
    function Porte(num) {
        if (num === void 0) { num = 0; }
        this.numero = num;
    }
    Porte.prototype.verifierClef = function (clef) {
        if (clef == undefined)
            return false;
        if (clef.length == 0)
            return false;
        return true;
    };
    Object.defineProperty(Porte.prototype, "nomPorte", {
        get: function () { return "porte_" + this.typeOfPorte() + "_" + this.numero; },
        enumerable: false,
        configurable: true
    });
    Porte.prototype.ouvrir = function () { console.log("la porte s'ouvre ... "); };
    Porte.prototype.fermer = function () { console.log("la porte se ferme ... "); };
    return Porte;
}());
var porteQuelconque;
//porteQuelconque = new Porte(5); //impossible si abstract
var PorteCoulissante = /** @class */ (function (_super) {
    __extends(PorteCoulissante, _super);
    function PorteCoulissante(num) {
        if (num === void 0) { num = 0; }
        var _this = _super.call(this, num) || this;
        _this.ouvertureGlissiere = 0; //en cm
        return _this;
    }
    PorteCoulissante.prototype.typeOfPorte = function () { return "coulissante"; };
    PorteCoulissante.prototype.faireCoulisserPorte = function (ouverture) {
        this.ouvertureGlissiere = ouverture;
        console.log("ouverture porte (sur glissière)=" + this.ouvertureGlissiere);
    };
    PorteCoulissante.prototype.ouvrir = function () {
        _super.prototype.ouvrir.call(this);
        this.faireCoulisserPorte(80);
    };
    PorteCoulissante.prototype.fermer = function () {
        _super.prototype.fermer.call(this);
        this.faireCoulisserPorte(0);
    };
    return PorteCoulissante;
}(Porte));
var porteCoulissante = new PorteCoulissante(8);
console.log(porteCoulissante.nomPorte); // porte_coulissante_8
porteCoulissante.ouvrir(); //la porte s'ouvre ...  ouverture porte (sur glissière)=80
porteCoulissante.fermer(); //la porte se ferme ... ouverture porte (sur glissière)=0
if (porteCoulissante.ouvertureGlissiere == 0)
    console.log("porte coulissante bien fermée");
var PortePivotante = /** @class */ (function (_super) {
    __extends(PortePivotante, _super);
    function PortePivotante(num) {
        if (num === void 0) { num = 0; }
        var _this = _super.call(this, num) || this;
        _this.angleRotationPorte = 0; //en degres
        return _this;
    }
    PortePivotante.prototype.typeOfPorte = function () { return "pivotante"; };
    PortePivotante.prototype.fairePivoterPorte = function (angle) {
        this.angleRotationPorte = angle;
        console.log("angle ouverture porte pivotante=" + this.angleRotationPorte);
    };
    PortePivotante.prototype.ouvrir = function () {
        _super.prototype.ouvrir.call(this);
        this.fairePivoterPorte(90);
    };
    PortePivotante.prototype.fermer = function () {
        _super.prototype.fermer.call(this);
        this.fairePivoterPorte(0);
    };
    return PortePivotante;
}(Porte));
var portePivotante = new PortePivotante(15);
console.log(portePivotante.nomPorte); // porte_pivotante_15
portePivotante.ouvrir(); //la porte s'ouvre ...  angle ouverture porte pivotante=90
portePivotante.fermer(); //la porte se ferme ... angle ouverture porte pivotante=0
if (portePivotante.angleRotationPorte == 0)
    console.log("porte pivotante bien fermée");
//Test du comportement attendu lié au polymorphisme 
var tabPortes = [];
tabPortes[0] = porteCoulissante;
tabPortes[1] = portePivotante;
console.log("\n --- ouverture de toutes les portes ---");
try {
    for (var tabPortes_1 = __values(tabPortes), tabPortes_1_1 = tabPortes_1.next(); !tabPortes_1_1.done; tabPortes_1_1 = tabPortes_1.next()) {
        var p = tabPortes_1_1.value;
        p.ouvrir(); //porte (peut importe ton type), ouvre toi !
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (tabPortes_1_1 && !tabPortes_1_1.done && (_a = tabPortes_1.return)) _a.call(tabPortes_1);
    }
    finally { if (e_1) throw e_1.error; }
}
console.log(" --- Ali baba peut maintenant passer ...");
//# sourceMappingURL=portes.js.map