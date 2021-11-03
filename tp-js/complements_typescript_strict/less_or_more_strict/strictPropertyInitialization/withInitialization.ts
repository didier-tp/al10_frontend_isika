class PersonneV2 { 
    prenom : string;
    nom : string;
    taille : number = 0; //1ere façon d'initialiser (valeur par défaut)

    constructor(prenom="",nom=""){
        //2eme façon d'initialiser (via constructeur)
        this.prenom=prenom ; 
        this.nom=nom;
    }
}

let p2A = new PersonneV2();
console.log("p2A="+JSON.stringify(p2A));

let p2B = new PersonneV2("jean","Bon");
console.log("p2B="+JSON.stringify(p2B));

/*
error TS5052: Option 'strictPropertyInitialization' cannot be specified without specifying option 'strictNullChecks'.
----
heureusement --strict correspond à --strictPropertyInitialization
    plus --strictNullChecks plus 6 autres options
*/