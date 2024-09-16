import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnChanges {
  @Input() author!: Author;
  friends: Author[] = [];

  constructor(private authorsService: AuthorsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['author'] && this.author) {
      this.loadFriends();
    }
  }

  loadFriends(): void {
    console.clear()
    if(this.author.friends){
      this.authorsService.getFriends(this.author.friends).subscribe({
        next: (response) => {
         this.friends = response
          console.log(response);
        },
        error: (error) =>{
          console.error("Error loading friend: ", error.message )
        }
      })
    }
  }
}
