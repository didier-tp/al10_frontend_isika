import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDeviseComponent } from './admin-devise/admin-devise.component';

import { BasicComponent } from './basic/basic.component';
import { CalculatriceComponent } from './basic/calculatrice/calculatrice.component';
import { TvaComponent } from './basic/tva/tva.component';
import { ConversionComponent } from './conversion/conversion.component';

import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: 'ngr-welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/ngr-welcome', pathMatch: 'full'},
  { path: 'ngr-login', component: LoginComponent },
  { path: 'ngr-basic', component: BasicComponent ,
     children: [
      { path: 'tva', component: TvaComponent },
      { path: 'calculatrice/:mode', component: CalculatriceComponent },
      { path: '', redirectTo: 'tva', pathMatch: 'prefix'}
    ]
 },
  { path: 'ngr-conversion', component: ConversionComponent },
  { path: 'ngr-admin-devise', component: AdminDeviseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
