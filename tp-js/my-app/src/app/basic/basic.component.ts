import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  valeurCurseur :number =0;

  onChangeCurseur(evt : {value:number}){
    this.valeurCurseur = evt.value;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
