import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/common/service/produit.service';

@Component({
  selector: 'app-seuil',
  templateUrl: './seuil.component.html',
  styleUrls: ['./seuil.component.scss']
})
export class SeuilComponent implements OnInit {

  public seuilMax=100; //à saisir

  onSeuilChange(){
    this._produitService.changerSeuil(this.seuilMax);
  }

  constructor(private _produitService : ProduitService) { }

  ngOnInit(): void {
  }

}
