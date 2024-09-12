import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  @Output() postAdded = new EventEmitter<Post>();
  new_post_text: string = '';
  

  getProfilePictureUrl(): string {
    return 'assets/default-profile-picture-url.webp';
  }



  submitPost(): void {
    if (this.new_post_text.trim()) {
      const newPost: Post = {
        id: Date.now(), 
        title: 'New Post',
        body: this.new_post_text,
        author: {
          id: Date.now(), 
          name: 'Ismail', 
          createdAt: new Date(), 
          profilePictureUrl: 'assets/default-profile-picture-url.webp'
        },
        createdAt: new Date() 
      };

      this.postAdded.emit(newPost);
      this.new_post_text = '';
    } else {
      console.log('Post text is empty');
    }
  }

  
}

