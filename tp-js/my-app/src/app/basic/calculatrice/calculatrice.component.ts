import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-calculatrice',
  templateUrl: './calculatrice.component.html',
  styleUrls: ['./calculatrice.component.scss']
})
export class CalculatriceComponent implements OnInit {

  a : number = 0 ;  //à saisir
  b : number = 0 ;  //à saisir
  res  : number = 0; //à afficher 

  modeChoisi : string = "sophistiquee";
  //modeChoisi : "simple" | "sophistique" = "simple";

  chose : any = 0;

  onRecupB(event : Event){
      let val = (<HTMLInputElement> event.target).value;
      this.b = Number(val);
  }

  calculer(op:string) : void {
    switch(op){
      case "+":
         //this.res = this.a + this.b;
         this.res = Number(this.a) + Number(this.b); break;
      case "-":
          this.res = this.a - this.b;  break;
      case "*":
            this.res = this.a * this.b;  break;
      case "/":
            this.res = this.a / this.b;  break;
    }
    
  }

  constructor(route : ActivatedRoute) { 
    route.params.subscribe(
      (params: Params)=> {
        this.modeChoisi = params['mode'];
      }
    )
    //NB: params['mode'] car { path: 'calculatrice/:mode', ... },
  }

  ngOnInit(): void {
  }

}
