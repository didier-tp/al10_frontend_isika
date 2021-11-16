import { Component, OnInit } from '@angular/core';

class Produit{
  constructor(public ref:string="?",
              public label : string ="?",
              public prix : number =0){}
}

@Component({
  selector: 'app-zz',
  templateUrl: './zz.component.html',
  styleUrls: ['./zz.component.scss']
})
export class ZzComponent implements OnInit {

  listeCategories = [ "cd" , "dvd" , "other"];
  categorie : string | undefined;//à choisir
  mapCategorieProduits= new Map<string,Produit[]>();
  listeProduits : Produit[] | undefined ; //selon categorie choisie

  onSelectCategorie(categorieChoisie:string){
    this.categorie=categorieChoisie;
    console.log("categorieChoisie="+this.categorie)
    this.listeProduits=this.mapCategorieProduits.get(this.categorie);
    console.log("listeProduits="+JSON.stringify(this.listeProduits))
  }

  constructor() { 
    this.mapCategorieProduits.set("cd" , 
    [ new Produit('p1','CD1',5.6) , new Produit('p2','CD2',9.6)]
    );

    this.mapCategorieProduits.set("dvd" , 
    [ new Produit('p3','DVD a',15.6) , new Produit('p4','DVD b',19.6)]
    );

    this.mapCategorieProduits.set("other" , 
    [ new Produit('p5','smartPhone',255.6) , new Produit('p6','TV',567.6)]
    );
  }

  ngOnInit(): void {
  }

}
