export interface IdHelper<T,ID>{
    extractId(e:T):ID; //extrait la valeur de la propriété faisant office de ID.PK
    setId(e:T,id:ID) : void;//fixe la (nouvelle) valeur de l'id
    isAuto():boolean;//true si auto_incr ou auto_gen , false sinon
    getIdPropName():string; //return id/pk property name (ex: id , _id , num , code , ...)
}

abstract class AbstractIdHelper<T,ID> implements IdHelper<T,ID>{
    constructor(protected idPropName:string , protected auto:boolean){
    }
    public extractId(e:T):ID { 
        return Reflect.get(e as any,this.idPropName);
    } 

    public setId(e:T,id:ID) : void { 
        Reflect.set(e as any,this.idPropName,id);
    }

    public isAuto() : boolean {
        return this.auto;
    }

    public getIdPropName(): string {
        return this.idPropName;
    }
}

export class AutoIdHelper<T,ID> extends AbstractIdHelper<T,ID>{
    constructor(idPropName:string="id"){
        super(idPropName,true);
    }
}

export class Auto_IdHelper<T,ID>  extends AbstractIdHelper<T,ID>{
    constructor(idPropName:string="_id"){
        super(idPropName,true);
    }
   
}

export class StaticIdHelper<T,ID>  extends AbstractIdHelper<T,ID>{
    constructor(idPropName:string="id"){
        super(idPropName,false);
    }
    
}



