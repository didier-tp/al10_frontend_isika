export interface BasicCrudService<T,ID>{
   findOne(query:any) : Promise<T>; //may be not implemented
   findById(id : ID) : Promise<T>; 
   findList(query:any) : Promise<T[]>; //may be not implemented
   findAll() : Promise<T[]>; 
   saveOrUpdate(e:T) : Promise<T>; //create/insert or update
   insert(e:T) : Promise<T>; //insert into or add or ...
   update(e:T): Promise<T>; //update
   remove(query:any) :Promise<void> ; //may be not implemented
   deleteById(id : ID) :Promise<void> ;
}

//NB: en cas d'erreur/exception , les promesses rejetees 
//contiendront un objet ErrorWithStatus (ou une sous classe telle que ErrorWithStatus)