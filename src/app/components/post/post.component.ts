import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: Post;
  @Output() postDeleted = new EventEmitter<number>();
  @Output() postUpdated = new EventEmitter<Post>();
  
  faEllipsis = faEllipsis;
  isDropdownOpen = false;
  isEditing = false;
  comment: string = '';

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
    return this.post.author.profilePictureUrl || 'assets/default-profile-picture-url.webp';
  }
}
