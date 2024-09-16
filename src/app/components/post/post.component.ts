import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Author } from 'src/app/models/author';
import { PostComment } from 'src/app/models/comment';
import { AuthorsService } from 'src/app/services/authors.service';  // Import the service
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnChanges {
  @Input() post!: Post;
  @Input() loggedAuthor! : Author;
  @Output() postDeleted = new EventEmitter<number>();
  @Output() postUpdated = new EventEmitter<Post>();
  @Output() newComment = new EventEmitter<PostComment>();

  faEllipsis = faEllipsis;
  isDropdownOpen = false;
  isEditing = false;
  beforeEdit: string = '';
  editingCommentId: number | null = null;
  deletingCommentId: number | null = null;
  postAuthor: Author | null = null;
  postTime ='';
  
  commentAuthors: Map<number, Author> = new Map();

  constructor(private authorsService: AuthorsService) {} // Inject the service

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && changes['post'].currentValue) {
      this.beforeEdit = this.post.content;
      this.postTime = this.formatDate(new Date((this.post.createdAt)))
      this.loadAuthor(); // Fetch the post author when the post changes
      this.loadCommentAuthors(); // Fetch the authors for comments
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

  loadAuthor(): void {
    if (this.post.userId) {
      this.authorsService.getAuthor(this.post.userId.toString()).subscribe({
        next: (author: Author) => {
          this.postAuthor = author;
        },
        error: (err) => {
          console.error('Error fetching post author:', err);
          this.postAuthor = null;
        }
      });
    }
  }

  // Fetch all authors for comments
  loadCommentAuthors(): void {
    // Assuming this method fetches all authors and updates commentAuthors map
    this.authorsService.getAllAuthor().subscribe((authors: Author[]) => {
      authors.forEach(author => {
        this.commentAuthors.set(author.id, author);
      });
    });
  }

  getProfilePictureUrl(): string {
    return this.postAuthor?.profile_picture || '../../../assets/images/default-profile-picture-url.webp';
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
    this.post.content = this.beforeEdit;
    this.isEditing = false;
  }

  handleDelete(): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    }
    this.postDeleted.emit(this.post.id);
  }

  // Comment logic
  comment: string = "";
  addComment(): void {
    if (this.comment.trim()) {
      const newComment: PostComment = {
        id: Date.now(),
        content: this.comment,
        PostId: this.post.id,
        UserId: this.loggedAuthor!.id,
        createdAt: new Date(),
      };

      this.post.comments.push(newComment);
      this.postUpdated.emit(this.post);
      this.comment = '';
    }
  }

  startEditComment(comment: PostComment): void {
    this.editingCommentId = comment.id;
    // Optionally store the original content if needed for cancel
  }

  saveCommentEdit(comment: PostComment): void {
    // Update the comment in post.comments
    const index = this.post.comments.findIndex(c => c.id === comment.id);
    if (index !== -1) {
      this.post.comments[index].content = comment.content;
    }
    this.postUpdated.emit(this.post);
    this.editingCommentId = null;
  }

  cancelCommentEdit(comment: PostComment): void {
    this.editingCommentId = null;
    // Optionally restore the original content if needed
  }

  confirmDeleteComment(comment: PostComment): void {
    this.deletingCommentId = comment.id;
  }

  deleteComment(comment: PostComment): void {
    this.post.comments = this.post.comments.filter(c => c.id !== comment.id);
    this.postUpdated.emit(this.post);
    this.deletingCommentId = null;
  }

  cancelDeleteComment(): void {
    this.deletingCommentId = null;
  }

  getCommentAuthorProfilePicture(authorId: number): string {
    const author = this.commentAuthors.get(authorId);
    return author?.profile_picture || '../../../assets/images/default-profile-picture-url.webp';
  }

  getCommentAuthorName(authorId: number): string {
    const author = this.commentAuthors.get(authorId);
    return author?.username || 'Unknown';
  }
}
