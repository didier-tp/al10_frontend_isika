import { Component, OnInit } from '@angular/core';
import { Produit, ProduitService } from 'src/app/common/service/produit.service';

@Component({
  selector: 'app-list-prod',
  templateUrl: './list-prod.component.html',
  styleUrls: ['./list-prod.component.scss']
})
export class ListProdComponent implements OnInit {

  listeProduits : Produit[]= [];

  constructor(private _produitService : ProduitService) { 
    //injection de dépendance par constructeur
    this._produitService.seuilMaxiObservable
        .subscribe(
          (seuilQuiVientChanger => 
            this.actualiserListeProduitSelonSeuilMaxi(seuilQuiVientChanger)))
  }

  actualiserListeProduitSelonSeuilMaxi(seuilMaxi : number){
    this._produitService.rechercherProduitSimu$(seuilMaxi)
        .subscribe((listP : Produit[])=> { this.listeProduits = listP})
  
  }      

  ngOnInit(): void {
  }

}
