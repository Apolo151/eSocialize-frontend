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

  @Input() loggedAuthor!: Author;
  @Output() friendAdded = new EventEmitter<Number>();
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
    if (this.loggedAuthor != null){
     this.imageUrl = this.loggedAuthor.profilePicture;
    }else{
      console.log("No author")
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  loadAllAutohrs(){
    this.authorService.getAllAuthors().subscribe(
      (response: Author[]) => {
        this.authors = response.filter(author => {
          if(this.loggedAuthor.followings){
            return author.id !== this.loggedAuthor.id && !this.loggedAuthor.followings.includes(author.id);
          }
          else{
           return author.id !== this.loggedAuthor.id
          }
        })
      },
      (error) =>{
        this.errorMessege = 'Failed to load authors';
      }
    )
  }

  followFriend(id : number){
    const author = this.authors.find(author => author.id.toString() === id.toString());
    if(this.loggedAuthor.followings?.toString().includes(id.toString())){
      alert(author?.userName + " is already your friend")
    }
    else{
      //this.author.friends?.push(Number(id))
      console.log(Number(id))
      this.friendAdded.emit(Number(id))
    }
  }

  addFriend(id : number){
/*   const author = this.authors.find(author => author.id.toString() === id.toString());
     if(this.author.friends?.toString().includes(id.toString())){
      alert(author?.userName + " is already your friend")
    }
     else{
      this.author.friends?.push(Number(id))
      this.friendAdded.emit(this.author)
    } */
  }

  isFollowed(id : number): Boolean{
    if(this.loggedAuthor.followings){
      return this.loggedAuthor.followings?.includes(id)
    }
    return false;
  }

  goToUserProfile() {
    if (this.loggedAuthor && this.loggedAuthor.id) {
      this.router.navigate([`/user/${this.loggedAuthor.id}`]); 
    }
  }

  logOut(){
    this.router.navigate([`login`]); 
    this.authorService.logout()
  }

  openFriendProfile(id : number){
    this.router.navigate([`/user/${id}`]); 
  }


}