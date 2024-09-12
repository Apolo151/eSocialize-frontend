import { Component, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service'; // Import PostService
import { Post } from 'src/app/models/post';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: Post;
  faEllipsis = faEllipsis;
  isDropdownOpen = false;
  isEditing = false;
  comment: string = '';

  constructor(private postService: PostService) {}

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
    this.postService.updatePost(this.post).subscribe({
      next: (updatedPost) => {
        console.log('Post updated successfully:', updatedPost);
        this.isEditing = false; 
      },
      error: (err) => {
        console.error('Error updating post:', err);
      }
    });
  }

  cancelEditing(): void {
    console.log("Editing canceled");
    this.isEditing = false;
  }

  handleDelete(): void {
    if(this.isDropdownOpen)
      this.isDropdownOpen = false;
    this.postService.deletePost(this.post.id).subscribe({
      next: (deletedPost)=>{
        console.log("Deleted Successfully",deletedPost);
        window.location.reload(); 
      },
      error:(err)=>{
        console.log("Error deleting post:",err);
      }
    });
  }

  getProfilePictureUrl(): string {
    return this.post.author.profilePictureUrl || 'assets/default-profile-picture-url.webp';
  }
}
