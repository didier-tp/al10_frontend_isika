import { Personne } from './personnes'

export class Employe extends Personne {
    constructor(numero:number=0,
                prenom:string="?",
                nom:string="?",
                age:number=0,
                public salaire:number=0){
        super(numero,prenom,nom,age) ;         
    }

    augmenterSalaire(augmentation: number){
        this.salaire += augmentation;
    }

}