import { Component, Input } from '@angular/core';
import {Post} from 'src/app/models/post'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: Post;


  getProfilePictureUrl(): string {
    return this.post.author.profilePictureUrl || 'assets/default-profile-picture-url.webp';
  }

  comment: string = ''
}
