import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private _couleurFondPreferee :string ;

  public get couleurFondPreferee(){
    return this._couleurFondPreferee;
  }

  public set couleurFondPreferee(c:string){
    this._couleurFondPreferee=c;
    localStorage.setItem('preferences.couleurFond',c);
  }

  constructor() { 
    let c = localStorage.getItem('preferences.couleurFond');
    this._couleurFondPreferee = c?c:'lightgrey';
  }
}
