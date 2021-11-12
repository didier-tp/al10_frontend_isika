export interface Devise  {
   code :string ; 
   nom :string ;
   change :number ;
}


//real class for instanciation ,  with constructor .
export class DeviseObject implements Devise {
   constructor(public code:string = "?" , 
               public nom:string = "?",
               public change:number= 0){
   }
}



//exemples: ("USD" , "dollar" , 1) ,  ("EUR" , "euro" , 0.9)