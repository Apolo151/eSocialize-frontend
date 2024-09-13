import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Author } from 'src/app/models/author';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  @Input() author!: Author;
  @Output() postAdded = new EventEmitter<Post>();
  new_post_text: string = '';
  authorImg : string ='';
  

  ngOnInit(): void {
    if (this.author != null){
     this.authorImg = this.author.profilePictureUrl
    }else{
      console.log("No author")
    }

  }



/*id: number;     
    title: string;      
    body: string;       
    author: Author;     
    createdAt: Date;  */
  
  submitPost(): void {
    if (this.new_post_text.trim()) {
      const newPost: Post = {
        id: Date.now(), 
        title: 'New Post',
        body: this.new_post_text,
        author : this.author,
        createdAt: new Date() 
      };

      this.postAdded.emit(newPost);
      this.new_post_text = '';
    } else {
      console.log('Post text is empty');
    }
  }

  
}

