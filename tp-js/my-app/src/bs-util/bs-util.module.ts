import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { BsuTogglePanelComponent } from "./bsu-toggle-panel/bsu-toggle-panel.component";
import { BsuMyFormGroupWithLabelComponent } from "./bsu-my-form-group-with-label/bsu-my-form-group-with-label.component";
import { BsuNavBarComponent } from './bsu-nav-bar/bsu-nav-bar.component';
import { BsuNavItemComponent } from './bsu-nav-item/bsu-nav-item.component';
import { BsuDropdownMenuComponent } from './bsu-dropdown-menu/bsu-dropdown-menu.component';
import { BsuOverviewCardComponent } from './bsu-overview-card/bsu-overview-card.component';
import { BsuModalComponent } from './bsu-modal/bsu-modal.component';


@NgModule({
  imports: [
    CommonModule , FormsModule , RouterModule , BrowserAnimationsModule , 
    CollapseModule.forRoot() ,BsDropdownModule.forRoot() , ModalModule.forRoot() 
  ],
  exports: [
    BsuTogglePanelComponent ,
    BsuMyFormGroupWithLabelComponent , BsuNavBarComponent ,
    BsuOverviewCardComponent , BsuModalComponent 
  ],
  declarations: [ BsuTogglePanelComponent ,
    BsuMyFormGroupWithLabelComponent , BsuNavBarComponent ,  BsuNavItemComponent , BsuDropdownMenuComponent   ,
      BsuOverviewCardComponent ,BsuModalComponent 
  ]
})
export class BsUtilModule { }
