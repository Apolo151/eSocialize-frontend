import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Author } from 'src/app/models/author';
import { Post } from 'src/app/models/post';
import { PostComponent } from '../post/post.component';
import { PostComment } from 'src/app/models/comment';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  @Input() author!: Author;
  @Output() postAdded = new EventEmitter<Post>();
  new_post_text: string = '';
  authorImg? : string ='';
  

  ngOnInit(): void {
    if (this.author != null){
     this.authorImg = this.author.profilePicture
    }else{
      console.log("No author")
    }

  }
  
  submitPost(): void {
    if (this.new_post_text.trim()) {
      const newPost: Post = {
        id: Date.now(), 
        content: this.new_post_text,
        author : this.author,
        createdAt: new Date() ,
        comments:[],
        likes: []
      };

      this.postAdded.emit(newPost);
      this.new_post_text = '';
    } else {
      console.log('Post text is empty');
    }
  }

  
}

