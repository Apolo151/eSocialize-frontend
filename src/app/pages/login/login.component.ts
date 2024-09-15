import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { Author } from 'src/app/models/author';
import { AuthorsService } from 'src/app/services/authors.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userNameText : string = '';
  userNamePassword : string = '';

  constructor(private authorService: AuthorsService, private router: Router){

  }
  onLogin(){
    console.clear
    if(this.userNameText.length && this.userNamePassword){
      this.authorService.authorLogIn(this.userNameText,this.userNamePassword).subscribe((author) => {
        if(author){
          console.log("Success")
          this.router.navigateByUrl(`/home/${author.id}`);
        }else{
          alert("Wrong user name or password ❌")
        }
      })
      
      this.userNameText = ''
      this.userNamePassword = ''
    }
  }

}
