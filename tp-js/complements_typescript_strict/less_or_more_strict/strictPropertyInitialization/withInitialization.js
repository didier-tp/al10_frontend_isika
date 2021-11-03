var PersonneV2 = /** @class */ (function () {
    function PersonneV2(prenom, nom) {
        if (prenom === void 0) { prenom = ""; }
        if (nom === void 0) { nom = ""; }
        this.taille = 0; //1ere façon d'initialiser (valeur par défaut)
        //2eme façon d'initialiser (via constructeur)
        this.prenom = prenom;
        this.nom = nom;
    }
    return PersonneV2;
}());
var p2A = new PersonneV2();
console.log("p2A=" + JSON.stringify(p2A));
var p2B = new PersonneV2("jean", "Bon");
console.log("p2B=" + JSON.stringify(p2B));
/*
error TS5052: Option 'strictPropertyInitialization' cannot be specified without specifying option 'strictNullChecks'.
----
heureusement --strict correspond à --strictPropertyInitialization
    plus --strictNullChecks plus 6 autres options
*/ 
