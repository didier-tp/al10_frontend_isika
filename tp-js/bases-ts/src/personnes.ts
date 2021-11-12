export interface IPerson {
    numero : number;
    nom:string;
    prenom? : string
}

export class Personne{

    constructor(public numero:number|undefined = undefined, 
                public prenom :string ="?" ,
                public  nom:string ="?" , 
                private _age : number = 0){  
    }

    public get age() :number{
        return this._age;
    }

    public set age(a:number){
        if(a>=0)
             this._age=a;
        else throw "age negatif invalide"
    }
    

    incrementerAge():void {
        this._age++;
    }

}


