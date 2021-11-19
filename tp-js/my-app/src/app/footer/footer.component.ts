import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../common/service/preferences.service';
import { ProduitService } from '../common/service/produit.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  nombreProduits : number = 0; // {{nombreProduits}}

  listeCouleurs : string[] = [ "lightyellow", "white",
     "lightgrey" , "lightgreen" , "lightpink" , "lightblue"] ; 

  constructor(public preferencesService : PreferencesService,
    private _produitService : ProduitService) { 
      this._produitService.seuilMaxiObservable
        .subscribe((seuilQuiVientChanger => 
            this.actualiserNombreProduitSelonSeuilMaxi(seuilQuiVientChanger)))
    
  }

  actualiserNombreProduitSelonSeuilMaxi(seuilMaxi: number){
    this._produitService.rechercherNombreProduitSimu$(seuilMaxi)
                        .subscribe( (nb) => this.nombreProduits = nb)
  }


  ngOnInit(): void {
  }

}
