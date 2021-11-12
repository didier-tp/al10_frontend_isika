import { DeviseDataService } from "../itf/DeviseDataService";
import { GenericMemDataService } from "./generic/GenericMemDataService";
import { Devise , DeviseObject } from "../../model/devise";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";

// memory Map implementation of DeviseDataService 

export class MemDeviseService 
       extends GenericMemDataService<Devise,string>
       implements DeviseDataService {

    private deviseIdHelper : IdHelper<Devise,string> = new StaticIdHelper<Devise,string>("code");

    constructor(){
        super();
        this.idHelper=this.deviseIdHelper;
        this.dataMap.set("USD", new DeviseObject("USD" , "Dollar" , 1));
        this.dataMap.set("EUR", new DeviseObject("EUR" , "Euro" , 0.91));
        this.dataMap.set("GBP", new DeviseObject("GBP" , "Livre" , 0.81));
        this.dataMap.set("JPY", new DeviseObject("JPY" , "Yen" , 132.01));
    }

    

}