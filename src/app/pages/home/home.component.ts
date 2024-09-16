import { Component, inject, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Author } from 'src/app/models/author';
import { PostService } from 'src/app/services/post.service';
import { AuthorsService} from 'src/app/services/authors.service';
import { PostComment } from 'src/app/models/comment';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  authors: Author[] = [];
  authorId: string = '';
  author: Author | undefined;
  errorMessage: string = '';


  constructor(private postService: PostService, private authorService : AuthorsService, private route : ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.authorId = params.get('id')!;
      console.log('Author ID:', this.authorId);
    });
  }
  ngOnInit(): void {
    this.loadPosts();
    this.loadAuthor();
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe({
      next: (res: Post[]) => {
        this.posts = [...res].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        console.log(this.posts)
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      }
    });
  }

  loadAllAutohrs(){
    this.authorService.getAllAuthors().subscribe(
      (response: Author[]) => {
        this.authors = response
      },
      (error) =>{
        this.errorMessage = 'Failed to load authors';
      }
    )
  }

  loadAuthor(): void{
    this.authorService.getAuthor(this.authorId).subscribe({
      next: (data) => {
        this.author = data;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  handlePostAdded(newPost: Post): void {
    this.postService.addPost(newPost).subscribe({
      next: (post) => {
        console.log('Post added successfully:', post);
        this.posts.push(newPost);
      },
      error: (err) => {
        console.error('Error adding post:', err);
      }
    });
  }

  handlePostDeleted(postId: number): void {
    this.postService.deletePost(postId).subscribe({
      
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

  addCommentToPost(newComment: PostComment, postId: number) {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.comments.push(newComment); 
    }
  }

  goToUserProfile(userId: string) {
    this.router.navigate([`/user/${userId}`]);
  }

  addFriend(author: Author) {
    // console.log(author.friends?.toString())
    this.authorService.addFriend(author).subscribe ({
      next: (response) => {
        const index = this.authors.findIndex(a => a.id === response.id);
        if(index !== -1 ){
          this.authors[index] = response;
          console.log("Friend added successfully");
        }
      }
    })
    
    }

}
