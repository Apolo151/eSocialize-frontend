import { Component, Input, Output, EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/models/post';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Author } from 'src/app/models/author';
import { PostComment } from 'src/app/models/comment';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() author!:Author;
  @Input() post!: Post;
  @Output() postDeleted = new EventEmitter<number>();
  @Output() postUpdated = new EventEmitter<Post>();
  @Output() newComment = new EventEmitter<PostComment>();

  faEllipsis = faEllipsis;
  isDropdownOpen = false;
  isEditing = false;
  beforeEdit: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && changes['post'].currentValue) {
      this.beforeEdit = this.post.body;
    }
  }

  

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  handleEdit(): void {
    if (this.isDropdownOpen) {
      this.toggleDropdown();
    }
    this.toggleEdit();
  }

  savePost(): void {
    this.postUpdated.emit(this.post);
    this.isEditing = false; 
  }

  cancelEditing(): void {
    console.log("Editing canceled");
    this.post.body = this.beforeEdit;
    this.isEditing = false;
  }

  handleDelete(): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
    console.log(this.post.id);
    this.postDeleted.emit(this.post.id);
  }

  getProfilePictureUrl(): string {
    return this.post.author.profilePictureUrl || '../../../assets/images/default-profile-picture-url.webp';
  }
  
  //coment logic
  comment: string = '';

  addComment(): void{
    const newComment : PostComment = {
      id: Date.now(),
      author: this.getCurrentUser(),
      body: this.comment,
      createdAt: new Date(),
    };

    this.newComment.emit(newComment);
    this.comment = "";

  }

  getCurrentUser(){
    return {
      id: 1,
      name: 'Ismail',
      profilePictureUrl: 'default.jpg',
      createdAt: new Date(),
    }
  }

}
