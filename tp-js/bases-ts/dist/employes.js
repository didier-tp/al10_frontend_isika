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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employe = void 0;
var personnes_1 = require("./personnes");
var Employe = /** @class */ (function (_super) {
    __extends(Employe, _super);
    function Employe(numero, prenom, nom, age, salaire) {
        if (numero === void 0) { numero = 0; }
        if (prenom === void 0) { prenom = "?"; }
        if (nom === void 0) { nom = "?"; }
        if (age === void 0) { age = 0; }
        if (salaire === void 0) { salaire = 0; }
        var _this = _super.call(this, numero, prenom, nom, age) || this;
        _this.salaire = salaire;
        return _this;
    }
    Employe.prototype.augmenterSalaire = function (augmentation) {
        this.salaire += augmentation;
    };
    return Employe;
}(personnes_1.Personne));
exports.Employe = Employe;
//# sourceMappingURL=employes.js.map