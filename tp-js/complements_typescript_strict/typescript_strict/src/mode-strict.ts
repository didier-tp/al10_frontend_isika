//typescript en mode strict
console.log("typescript en mode strict");

var v1 : string;
//console.log("v1="+v1);// error TS2454: Variable 'v1' is used before being assigned.

var v2 : string | null ;
//console.log("v2="+v2); //error TS2454 and v2=undefined at runtime

var v3 : string | null = null;
console.log("v3="+v3); //v3=null
console.log("------------------");

// Types alias =========================
type stringOrNull = string | null;
type stringOrNullOrUndefined = string | null | undefined;
type numberOrNull = number | null;
type numberOrNullOrUndefined = number | null | undefined;

//-----------------------

class PersonneVa { 
    prenom : string;
    nom : string;
    taille : number = 0; //1ere façon d'initialiser (valeur par défaut)

    constructor(prenom : string ="",nom :string =""){
        //2eme façon d'initialiser (via constructeur)
        this.prenom=prenom ; 
        this.nom=nom;
    }

    methodXy():void{
        //this.nom = null; //Erreur , null=valeur interdite
        //this.nom = undefined; //Erreur , undefined=valeur interdite
        this.nom=this.nom.toUpperCase();
    }
}

let pa1 = new PersonneVa();
console.log("pa1="+JSON.stringify(pa1));

let pa2 = new PersonneVa("jean","Bon"); pa2.taille=175; pa2.methodXy();
console.log("pa2="+JSON.stringify(pa2));
console.log("------------------");
//-------------------

class PersonneVb { 
    prenom : stringOrNull;
    nom : stringOrNull;
    taille : numberOrNull = null; //1ere façon d'initialiser (valeur par défaut)

    constructor(prenom :stringOrNull =null,nom :stringOrNull =null){
        //2eme façon d'initialiser (via constructeur)
        this.prenom=prenom ; 
        this.nom=nom;
    }
    methodXy():void{
        //this.nom = null; //OK,null=valeur autorisée
        //this.nom = undefined; //Erreur , undefined=valeur interdite
        //this.nom=this.nom.toUpperCase(); //Error this.nom possibly null
        if(this.nom)
            this.nom=this.nom.toUpperCase(); //OK apres verif != null
    }


}

let pb1 = new PersonneVb();
console.log("pb1="+JSON.stringify(pb1));

let pb2 = new PersonneVb("jean","Bon"); pb2.taille=175; pb2.methodXy();
console.log("pb2="+JSON.stringify(pb2));
console.log("------------------");
//-------------------

class PersonneVc { 
    prenom : stringOrNullOrUndefined;
    nom : stringOrNullOrUndefined;
    taille : numberOrNullOrUndefined = undefined; //1ere façon d'initialiser (valeur par défaut)

    constructor(prenom :stringOrNullOrUndefined =undefined,nom :stringOrNullOrUndefined =undefined){
        //2eme façon d'initialiser (via constructeur)
        this.prenom=prenom ; 
        this.nom=nom;
    }

    methodXy():void{
        //this.nom = null; //OK,null=valeur autorisée
        //this.nom = undefined; //Ok , undefined=valeur autorisée
        //this.nom=this.nom.toUpperCase(); //Error this.nom possibly null or undefined
        if(this.nom)
            this.nom=this.nom.toUpperCase(); //OK apres verif != null or undefined
    }
}

let pc1 = new PersonneVc();
console.log("pc1="+JSON.stringify(pc1));

let pc2 = new PersonneVc("jean","Bon"); pc2.taille=175; pc2.methodXy();
console.log("pc2="+JSON.stringify(pc2));
console.log("------------------");

//-------------------
//NB: avec la syntaxe spéciale et explicite ! le compilateur 
//typescript accepte que certaines variables ne soient exceptionnellement pas initialisées dès le départ
//meme en mode strict

class PersonneVd { 
    prenom! : stringOrNull;
    nom! : string;
    taille! : number ; 

    methodXy():void{
        //this.nom = null; //Erreur,null=valeur interdite
        //this.nom = undefined; //Erreur , undefined=valeur interdite
        this.nom=this.nom.toUpperCase(); //ATTENTION: pas de verification si pas undefined !!!!
        if(this.prenom)
            this.prenom=this.prenom.toUpperCase(); //OK apres verif != null or undefined
    }
}

let pvd = new PersonneVd();
console.log("pvd="+JSON.stringify(pvd));
//pvd.methodXy();  //Erreur à l'execution : TypeError: Cannot read property 'toUpperCase' of undefined
//CONCLUSION: la syntaxe ! est du laxisme explicitement permis en mode strict !!!
//            plutôt deconseillé !!!!

pvd.prenom= "jean"; pvd.nom= "Bon"; pvd.taille= 175;pvd.methodXy();
console.log("pvd="+JSON.stringify(pvd));
console.log("------------------");

//------------- enum en mode strict

enum Color {Red, Green, Blue}; // start at 0 by default
type KeyOfColor = keyof typeof Color;

// enum Color {Red = 1, Green, Blue}; 

var c: Color = Color.Green;  console.log(c); //display as "1" by default
var colorName: string = Color[1];  console.log(colorName); // "Green" if "Red" is at [0]
var colorEnumVal =  Color["Green"];  console.log(colorEnumVal);//1 
colorEnumVal =  Color[<KeyOfColor> colorName];  console.log(colorEnumVal);//1 