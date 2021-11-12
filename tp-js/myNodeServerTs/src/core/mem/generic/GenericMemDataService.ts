import { BasicCrudService } from "../../itf/generic/BasicCrudService";
import { IdHelper, AutoIdHelper } from "../../itf/generic/IdHelper";
import { NotFoundError } from "../../../error/errorWithStatus";

export class GenericMemDataService<T,ID> implements BasicCrudService<T,ID>{
      
    private lastId : number = 0; //if ID=number (or number in string) and idHelper.isAuto() only
    protected dataMap : Map<ID,T> = new Map<ID,T>();//empty map

    //may be replaced/override in subclass:
    protected idHelper : IdHelper<T,ID>  = new AutoIdHelper<T,ID>();//.id

    constructor(){
    }

    public initLastId(lastId: ID=null){
        if(typeof this.lastId=="number"){
            this.lastId=lastId as any as number;
        }else{
            this.lastId = Number(this.lastId);
        }
    }

    public incrementLastId() : ID{
        if(typeof this.lastId=="number"){
            this.lastId++;
            return this.lastId as any as ID;
        }else{
            this.lastId = 1 + Number(this.lastId);
            return ("" + this.lastId) as any as ID;
        }
    }

    public insert(dataObj: T): Promise<T> {
        return new Promise((resolve,reject) => {
            let id : ID = this.idHelper.extractId(dataObj);
            if(!this.idHelper.isAuto() && id==null)
               reject(new Error("entity must have a valid defined id , no auto_incr"));
            if(this.idHelper.isAuto() && id==null){
               id = this.incrementLastId();
               this.idHelper.setId(dataObj,id);
            }
          // console.log("in insert() , dataObj="+JSON.stringify(dataObj) + " and id="+id);
           this.dataMap.set(id,dataObj);
           resolve(dataObj);
            
        });
    }    

    saveOrUpdate(dataObj: T): Promise<T> {
        //console.log("in saveOrUpdate() , dataObj="+JSON.stringify(dataObj));
        return new Promise((resolve,reject) => {
        let id : ID = this.idHelper.extractId(dataObj);
        if(this.idHelper.isAuto() && id==null){
            this.insert(dataObj).then( (data)=>{resolve(data)} , (ex) => { reject(ex); } );
        }
        else{
            this.update(dataObj).then( (data)=>{resolve(data)} , (ex) => { reject(ex); } );
        }
    });
    }
    update(dataObj: T): Promise<T> {
        return new Promise((resolve,reject) => {
           let id : ID = this.idHelper.extractId(dataObj);
           //console.log("in update() , dataObj="+JSON.stringify(dataObj) + " and id="+id);
           this.dataMap.set(id,dataObj);
           resolve(dataObj);
        });
    }

    deleteById(id: ID): Promise<void> {
        return new Promise((resolve,reject) => {
        if(this.dataMap.has(id)){
             this.dataMap.delete(id);
             resolve();
        }else{
            reject(new NotFoundError("not found for delete"));
        }
       });
    }
    
    public findById(id: ID): Promise<T> {
        return new Promise((resolve,reject) => {
            if(this.dataMap.has(id)){
                let dataObj = this.dataMap.get(id);
                resolve(dataObj);
            }else{
                reject(new NotFoundError("not found (id="+id+")"));
            }
        });
    }

    public findAll(): Promise<T[]> {
        return new Promise((resolve,reject) => {
            let allDataIterables = this.dataMap.values();
            let allDataArray = [ ...allDataIterables ];
            resolve(allDataArray);
        });
    }

    findOne(query: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
    findList(query: any): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    remove(query: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

}