import { Component, OnInit, Input } from '@angular/core';
import { MenuDefinition } from "src/bs-util/data/MenuDefinition";

@Component({
  selector: 'bsu-nav-bar',
  templateUrl: './bsu-nav-bar.component.html',
  styleUrls: ['./bsu-nav-bar.component.scss', '../css/bs-util.scss']
})
export class BsuNavBarComponent implements OnInit  {
  

  isNavbarCollapsed : boolean = true;

  @Input()
  public currentUserRoles : string|null=null; //ex: "admin,publisher"

  @Input()
  brandTitle : string ="my-app";

  @Input()
  menuDefs : MenuDefinition[] = [
  { label : "MyDropDownMenu1" , 
    children : [
      { label : "menu-item1" , path : "path1" } ,
      { label : "menu-item2" , path : "path2" },
      { divider : true },
      { label : "menu-item3" , path : "path3" }
    ]
  },
  { label : "menu-itemA" , path : "pathA" } , 
  { label : "menu-itemB" , path : "pathB" }
  ];

  

  constructor() { }

  ngOnInit() {
  }

}
