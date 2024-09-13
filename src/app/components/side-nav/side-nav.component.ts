import { Component, Input } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import { Author } from 'src/app/models/author';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Input() author!: Author;
  
  friends: Author[] = [];

  constructor(private authorsService : AuthorsService){}

  ngOnInit(): void {
    if (this.author != null){
      console.log(this.author.id)
      this.authorsService.getFriends(this.author.id).subscribe((friends) => (this.friends = friends));
    }else{
      console.log("No author")
    }

//    this.authorsService.getFriends(5).subscribe((friends) => (this.friends = friends));

  }

}
