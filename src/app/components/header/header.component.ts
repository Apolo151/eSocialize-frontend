import { Component, Input } from '@angular/core';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() author!: Author;

  imageUrl = '';
  logoUrl = 'https://media.istockphoto.com/id/1032803298/vector/concept-of-sharing-ideas-between-a-social-network.jpg?s=612x612&w=0&k=20&c=oBL1v-YS_gEtDGC2PPB1bd9ppJRtSlS88JRUBOIY9aE='

  ngOnInit(): void {
    if (this.author != null){
     this.imageUrl = this.author.profilePictureUrl
    }else{
      console.log("No author")
    }

  }
}