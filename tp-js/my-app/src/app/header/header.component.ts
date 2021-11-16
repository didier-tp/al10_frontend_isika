import { Component, Input, OnInit } from '@angular/core';
import { MenuDefinition } from 'src/bs-util/data/MenuDefinition';
import { PreferencesService } from '../common/service/preferences.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  titre : string ="titre par defaut";

  
  constructor(public preferencesService : PreferencesService) { 
    console.log("dans constructeur titre="+this.titre)
  }

  //equivalent de @PostConstruct de java
  ngOnInit(): void {
    console.log("dans ngOnInit titre="+this.titre)
  }
  
  myMenuDefs : MenuDefinition[] = [
    { label : "Partie1" , 
      children : [
        { label : "basic" , path : "/ngr-basic" } ,
        { label : "login" , path : "/ngr-login" },
        { divider : true },
        { label : "welcome" , path : "/ngr-welcome" }
      ]
    },
    { label : "basic" , path : "/ngr-basic" } , 
    { label : "login" , path : "/ngr-login" }
    ];




}
