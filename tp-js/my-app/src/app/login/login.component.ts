import { Component, OnInit } from '@angular/core';
import { Login } from '../common/data/login';
import { LoginResponse } from '../common/data/loginResponse';
import { User } from '../common/data/user';
import { SessionService } from '../common/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  today = new Date();

  public login : Login = new Login("admin1","pwdadmin1","admin");
  public message :string ="";
  public authenticated : boolean = false;

  public onLogin(){
     let user = new User(this.login.username ,  "12 rue Elle 75001 Parici");
     this._sessionService.user = user;
     this.message = "donnees saisies = " + JSON.stringify(this.login);
    
  }

  constructor(private _sessionService : SessionService) { 
      this.login.username = this._sessionService.user.username;
  }

  ngOnInit(): void {

  }

}
