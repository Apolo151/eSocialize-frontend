import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { ActivatedRoute } from '@angular/router';
import { AuthorsService } from 'src/app/services/authors.service';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';
import { PostComment } from 'src/app/models/comment';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  authorId: string = '';
  filteredPosts: Post[] = [];
  author?: Author;
  errorMessage?: string;
  isEditingProfile = false;
  editingAuthor: Author = { id: -1, username: '', email: '', bio: '', profile_picture: '', createdAt: new Date(), password: ' ' }; 


  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorsService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.authorId = params.get('id')!;
      this.loadAuthor();
    });
  }

  loadAuthor(): void {
    this.authorService.getAuthor(this.authorId).subscribe({
      next: (data) => {
        this.author = data;
        this.loadPosts();
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  loadPosts(): void {
    this.postService.getPostsByAuthorId(this.author!.id).subscribe({
      next: (posts) => {
        this.filteredPosts = posts;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  updateProfile(): void {
    if (this.editingAuthor) {
      this.authorService.updateAuthor(this.editingAuthor).subscribe({
        next: updatedAuthor => {
          this.author = updatedAuthor;
          this.isEditingProfile = false;
        },
        error: error => {
          console.error('Error updating author:', error);
        }
      });
    }
  }


  handlePostDeleted(postId: number): void {
    this.postService.deletePost(postId.toString()).subscribe({
      
      next: () => {
        console.log('Post deleted successfully');
        this.filteredPosts = this.filteredPosts.filter(post => post.id !== postId);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }

  handlePostUpdated(updatedPost: Post): void {
    this.postService.updatePost(updatedPost).subscribe({
      next: (post) => {
        console.log('Post updated successfully:', post);
        const index = this.filteredPosts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          this.filteredPosts[index] = post;
        }
      },
      error: (err) => {
        console.error('Error updating post:', err);
      }
    });
  }

  addCommentToPost(newComment: PostComment, postId: number) {
    const post = this.filteredPosts.find(p => p.id === postId);
    if (post) {
      post.comments.push(newComment); 
    }
  }


  getProfilePicture(): string {
    return this.author?.profile_picture || '../../../assets/images/default-profile-picture-url.webp';
  }
}
