import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , of } from 'rxjs';
import { map , flatMap ,toArray ,filter, mergeMap} from 'rxjs/operators';

export interface Produit {
  numero : number;
  label : string;
  prix : number;
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private  bsSeuilMaxi = new BehaviorSubject<number>(100); //seuil (pour prixMaxi)

  public changerSeuil(nouveauSeuilMaxi : number){
    this.bsSeuilMaxi.next(nouveauSeuilMaxi);
    //l'appel à next(90_ou_80)
    //va provoquer le rédéclenchement de toutes les callbacks 
    //(dans tous les composants)
  }

  /*dans un composant angular utilisant ce service on aura  
  produitService.seuilMaxiObservable.subscribe(
       (seuilQuiVientChanger => ....)
  )
  */
  public get seuilMaxiObservable() : Observable<number>{
    return this.bsSeuilMaxi;
  }


  private tabProduit = [
    { numero : 5 , label : "produit 1" , prix : 120 } ,
    { numero : 1 , label : "produit 1" , prix : 50 } ,
    { numero : 2 , label : "produit 2" , prix : 30 } ,
    { numero : 3 , label : "produit 3" , prix : 80 } ,
    { numero : 4 , label : "produit 4" , prix : 500 },
    { numero : 6 , label : "produit 4" , prix : 20 },
    ]

  public rechercherNombreProduitSimu$(prixMaxi : number) : Observable<number> { 
    return this.rechercherProduitSimu$(prixMaxi).pipe(
      map(tabProd=>tabProd.length)
    );
  }   

  //convention de nommage : nom de methode se terminant par $ 
  //pour indiquer type de retour de type Observable
  public rechercherProduitSimu$(prixMaxi : number) : Observable<Produit[]> {
  
    return of(this.tabProduit)
    .pipe(
    mergeMap(pInTab=>pInTab) ,
    map((p : Produit)=>{p.label = p.label.toUpperCase(); return p;}) ,
    filter((p) => p.prix <= prixMaxi) ,
    toArray(),
    map( tabP => tabP.sort( (p1,p2) => p1.prix - p2.prix))
    );
    }

  constructor() { }
}
