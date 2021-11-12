"use strict";
var CompteEpargne = /** @class */ (function () {
    function CompteEpargne(numero, solde) {
        if (solde === void 0) { solde = 0; }
        this.numero = numero;
        this.solde = solde;
    }
    CompteEpargne.prototype.calculerInterets = function () {
        return this.solde * CompteEpargne.tauxInteret / 100;
    };
    CompteEpargne.tauxInteret = 1.5;
    return CompteEpargne;
}());
var compteEpargne1 = new CompteEpargne(1, 200.0);
console.log("tauxInteret=" + CompteEpargne.tauxInteret);
console.log("interets pour compteEpargne1=" + compteEpargne1.calculerInterets());
//# sourceMappingURL=compteEpargne.js.map