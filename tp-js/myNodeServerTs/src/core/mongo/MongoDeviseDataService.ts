import { DeviseDataService } from "../itf/DeviseDataService";
import { GenericMongoDataService } from "./generic/GenericMongoDataService";
import { Devise  } from "../../model/devise";
import { IdHelper, StaticIdHelper } from "../itf/generic/IdHelper";

// MongoDB implementation of DeviseDataService 

export class MongoDeviseService 
       extends GenericMongoDataService<Devise,string>
       implements DeviseDataService {


    constructor(){
        super( "devises" ,  new StaticIdHelper<Devise,string>("code"));
    }

}