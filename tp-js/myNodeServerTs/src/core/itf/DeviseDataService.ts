import { Devise } from "../../model/devise";
import { BasicCrudService } from "./generic/BasicCrudService";

export interface DeviseDataService extends BasicCrudService<Devise,string>{
    /*
     inherited methods from BasicCrudService:
     insert,update,saveOrUpdate(dev: Devise) : Promise<Devise> ; 
     findById(codeDev: string) : Promise<Devise> ;
     deleteById(codeDev: string) :Promise<void> ;
     findAll() : Promise<Devise[]> ; 
     */
}
