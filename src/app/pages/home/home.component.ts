import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (res: Post[]) => {
        this.posts = [...res];
        console.log(res);
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      }
    });
  }

  handlePostAdded(newPost: Post): void {
    this.postService.addPost(newPost).subscribe({
      next: (post) => {
        console.log('Post added successfully:', post);
        this.posts.push(post);
      },
      error: (err) => {
        console.error('Error adding post:', err);
      }
    });
  }

  handlePostDeleted(postId: number): void {
    this.postService.deletePost(postId.toString()).subscribe({
      
      next: () => {
        console.log('Post deleted successfully');
        this.posts = this.posts.filter(post => post.id !== postId);
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
        const index = this.posts.findIndex(p => p.id === post.id);
        if (index !== -1) {
          this.posts[index] = post;
        }
      },
      error: (err) => {
        console.error('Error updating post:', err);
      }
    });
  }
}
