import { Component, Input } from '@angular/core';
import { Author } from 'src/app/models/author';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() author!: Author;
  authors :Author[] = [];
  errorMessege = '';
  isDropdownOpen = false;
  faAdd = faAdd;


  imageUrl = '';
  logoUrl = 'https://media.istockphoto.com/id/1032803298/vector/concept-of-sharing-ideas-between-a-social-network.jpg?s=612x612&w=0&k=20&c=oBL1v-YS_gEtDGC2PPB1bd9ppJRtSlS88JRUBOIY9aE='

  constructor(private authorService: AuthorsService){}

  ngOnInit(): void {
    this.loadAllAutohrs();
    if (this.author != null){
     this.imageUrl = this.author.profile_picture;
    }else{
      console.log("No author")
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  loadAllAutohrs(){
    this.authorService.getAllAuthor().subscribe(
      (response: Author[]) => {
        this.authors = response
      },
      (error) =>{
        this.errorMessege = 'Failed to load authors';
      }
    )
  }

  addFriend(id : number){
    console.log("added " + id);
  }

}