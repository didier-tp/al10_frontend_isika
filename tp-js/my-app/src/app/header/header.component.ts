import { Component, Input, OnInit } from '@angular/core';
import { PreferencesService } from '../common/service/preferences.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  titre : string ="titre par defaut";
/*
  myMenuDefs : MenuDefinition[] = [
    { label : "pour admin" , 
      children : [
        { label :"login" , path : "/ngr-login" } ,
        { divider : true },
        { label : "admin-devise" , path : "/ngr-admin-devise" , role : "admin" }
      ]
    },
    { label : "basic" , path : "/ngr-basic" } , 
    { label : "conversion" , path : "/ngr-conversion" },
    { label : "welcome" , path : "/ngr-welcome" } ,
    ];
*/
  /*
<bsu-nav-bar  [currentUserRoles]="loginService.roles" 
              [brandTitle]="titre"
              [menuDefs]="myMenuDefs"></bsu-nav-bar>
  */

  constructor(public preferencesService : PreferencesService) { 
    console.log("dans constructeur titre="+this.titre)
  }

  ngOnInit(): void {
    console.log("dans ngOnInit titre="+this.titre)
  }

}
