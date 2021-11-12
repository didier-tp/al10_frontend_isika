"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Personne = void 0;
var Personne = /** @class */ (function () {
    function Personne(numero, prenom, nom, _age) {
        if (numero === void 0) { numero = undefined; }
        if (prenom === void 0) { prenom = "?"; }
        if (nom === void 0) { nom = "?"; }
        if (_age === void 0) { _age = 0; }
        this.numero = numero;
        this.prenom = prenom;
        this.nom = nom;
        this._age = _age;
    }
    Object.defineProperty(Personne.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (a) {
            if (a >= 0)
                this._age = a;
            else
                throw "age negatif invalide";
        },
        enumerable: false,
        configurable: true
    });
    Personne.prototype.incrementerAge = function () {
        this._age++;
    };
    return Personne;
}());
exports.Personne = Personne;
//# sourceMappingURL=personnes.js.map