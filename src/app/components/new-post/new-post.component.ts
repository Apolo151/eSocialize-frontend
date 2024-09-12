import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import {Post} from 'src/app/models/post'
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  constructor(private postsService: PostService) {}
  new_post_text: string = ''


  getProfilePictureUrl(): string {
    return 'assets/default-profile-picture-url.webp';
  }


  handleSubmit(): void {
    if (this.new_post_text.trim()) {
      const newPost: Post = {
        id: Date.now(), 
        title: 'New Post',
        body: this.new_post_text,
        author: {
          id: Date.now(), 
          name: 'Ismail', 
          createdAt: new Date(), 
          profilePictureUrl: 'default-profile-picture-url.webp'
        },
        createdAt: new Date() 
      };

      this.postsService.addPost(newPost).subscribe(
        response => {
          console.log('Post added successfully', response);
          this.new_post_text = ''; 
        },
        error => {
          console.error('Error adding post', error);
        }
      );

    } else {
      console.log('empty');
    }
  }
  
}
