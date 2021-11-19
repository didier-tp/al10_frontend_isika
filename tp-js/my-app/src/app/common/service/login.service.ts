import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../data/login';
import { LoginResponse } from '../data/loginResponse';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private _apiBaseUrl ="http://localhost:8282/login-api"; 
  private _apiBaseUrl ="./login-api";

  private _headers = new HttpHeaders({'Content-Type': 'application/json'}); 

  constructor(private _http : HttpClient) { }

  public postLogin$(login: Login): Observable<LoginResponse>{
     let url = this._apiBaseUrl +"/public/auth";
    
     return this._http.post<LoginResponse>(url,login, {headers: this._headers} )
            .pipe(
                tap((loginResponse)=>{ this.sauvegarderJeton(loginResponse);})
            );
  }

  private sauvegarderJeton(loginResponse:LoginResponse){
       if(loginResponse.status){
         sessionStorage.setItem('authToken',loginResponse.token?loginResponse.token:"");
         //ou autre façon de mémoriser le jeton
       }
       else{
        sessionStorage.setItem('authToken',"");
       }
  }

}
