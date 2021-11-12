class CompteEpargne {
	static tauxInteret: number= 1.5;
    constructor(public numero: number , 
                public solde :number = 0){
	}
	calculerInterets(){
	  return this.solde * CompteEpargne.tauxInteret / 100;
    }
}

var compteEpargne1 = new CompteEpargne(1,200.0);
console.log("tauxInteret="+CompteEpargne.tauxInteret);
console.log("interets pour compteEpargne1="+compteEpargne1.calculerInterets());