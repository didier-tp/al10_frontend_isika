import { Injectable } from '@angular/core';
import { User } from '../data/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _user = new User();

  public get user(){ return this._user;}

  public set user(u:User){
    this._user=u;
    sessionStorage.setItem("session.user",JSON.stringify(this._user));
  }

  constructor() {
    let sUser = sessionStorage.getItem("session.user");
    if(sUser) {
      this._user = JSON.parse(sUser);
    }
   }
}
