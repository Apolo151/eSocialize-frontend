import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from 'src/app/models/author';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { AuthorsService } from 'src/app/services/authors.service';
import { Router } from '@angular/router';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() author!: Author;
  @Output() friendAdded = new EventEmitter<Author>();
  authors :Author[] = [];
  errorMessege = '';
  isDropdownOpen = false;
  faAdd = faAdd;
  faSignOut = faSignOut;

  imageUrl? = '';
  logoUrl = 'https://media.istockphoto.com/id/1032803298/vector/concept-of-sharing-ideas-between-a-social-network.jpg?s=612x612&w=0&k=20&c=oBL1v-YS_gEtDGC2PPB1bd9ppJRtSlS88JRUBOIY9aE='

  constructor(private authorService: AuthorsService, private router: Router){}

  ngOnInit(): void {
    this.loadAllAutohrs();
    if (this.author != null){
     this.imageUrl = this.author.profilePicture;
    }else{
      console.log("No author")
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  loadAllAutohrs(){
    console.log("hello")
    this.authorService.getAllAuthors().subscribe(
      (response: Author[]) => {
        this.authors = response
        console.log(this.authors)
      },
      (error) =>{
        this.errorMessege = 'Failed to load authors';
      }
    )
  }

  addFriend(id : number){
    const author = this.authors.find(author => author.id.toString() === id.toString());
    if(this.author.friends?.toString().includes(id.toString())){
      alert(author?.userName + " is already your friend")
    }
    else{
      this.author.friends?.push(Number(id))
      this.friendAdded.emit(this.author)
    }
  }

  goToUserProfile() {
    if (this.author && this.author.id) {
      this.router.navigate([`/user/${this.author.id}`]); 
    }
  }

  logOut(){

  }


}