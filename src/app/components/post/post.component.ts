import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/models/post';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Author } from 'src/app/models/author';
import { PostComment } from 'src/app/models/comment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnChanges {
  @Input() author!: Author;
  @Input() post!: Post;
  @Output() postDeleted = new EventEmitter<number>();
  @Output() postUpdated = new EventEmitter<Post>();
  @Output() newComment = new EventEmitter<PostComment>();

  faEllipsis = faEllipsis;
  isDropdownOpen = false;
  isEditing = false;
  beforeEdit: string = '';
  editingCommentId: number | null = null;
  deletingCommentId: number | null = null;

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
    this.post.body = this.beforeEdit;
    this.isEditing = false;
  }

  handleDelete(): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
    this.postDeleted.emit(this.post.id);
  }

  getProfilePictureUrl(): string {
    return this.post.author.profilePictureUrl || '../../../assets/images/default-profile-picture-url.webp';
  }

  // Comment logic
  comment: string = '';

  addComment(): void {
    const newComment: PostComment = {
      id: Date.now(),
      author: this.getCurrentUser(),
      body: this.comment,
      createdAt: new Date(),
    };

    this.post.comments.push(newComment);
    this.postUpdated.emit(this.post);
    this.comment = '';
  }

  startEditComment(comment: PostComment): void {
    this.editingCommentId = comment.id;
    comment.body = comment.body; 
  }

  saveCommentEdit(comment: PostComment): void {
    this.postUpdated.emit(this.post); 
  }

  cancelCommentEdit(comment: PostComment): void {
    this.editingCommentId = null; 
  }

  confirmDeleteComment(comment: PostComment): void {
    this.deletingCommentId = comment.id;
  }

  // Proceed with comment deletion
  deleteComment(comment: PostComment): void {
    this.post.comments = this.post.comments.filter(c => c.id !== comment.id);
    this.postUpdated.emit(this.post); 
    this.deletingCommentId = null;
  }

  cancelDeleteComment(): void {
    this.deletingCommentId = null;
  }

  getCurrentUser() {
    return {
      id: 1,
      name: 'Ismail',
      profilePictureUrl: 'default.jpg',
      createdAt: new Date(),
    };
  }
}
