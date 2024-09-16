import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { Author } from 'src/app/models/author';
import { AuthorsService } from 'src/app/services/authors.service';
import { AuthResponse } from 'src/app/models/authResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials: any = {
    "username" : "",
    "password" :""
  }
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": "69420"
    })
  };

  constructor(private http: HttpClient, private authorService: AuthorsService, private router: Router){

  }

  onLogin(){
    if(this.credentials.username && this.credentials.password){
      this.authorService.authorLogIn(this.credentials).subscribe(
        (response : AuthResponse) =>{
          if(!response.success){
            alert("wrong user name or password ❌")
          }
          else if(response.success && response.accessToken){
            localStorage.setItem('loginToken', response.accessToken)
            alert("loggedSucce")
          }else
          {
             console.log(response.message)
          }
        }
      ) 
    }
  }
}
