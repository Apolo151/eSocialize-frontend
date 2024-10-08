import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { map } from 'rxjs/operators';
import { PostComment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  //private apiUrl = 'http://localhost:5108//api/Posts'
  private apiUrl = 'https://c856-41-199-138-62.ngrok-free.app/api/Posts/';
  private commentUrl = "https://c856-41-199-138-62.ngrok-free.app/api/Comments/"
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": "69420"
    })
  };

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<any[]>(this.apiUrl, this.httpOptions).pipe(
      map(posts => posts.map(post => ({
        id: post.id,
        content: post.content,
        createdAt: new Date(post.createdAt),
        author: {
          id: post.author.id,
          userName: post.author.userName,
          email: post.author.email,
          bio: post.author.bio,
          profilePicture: post.author.profilePicture,
          friends: post.author.followings
        },
        comments: post.comments.map((comment: any) => ({
          id: comment.id,
          PostId: comment.postId, 
          UserId: comment.commenterId,
          content: comment.content,
          createdAt: new Date(comment.createdAt)
        })),
      })))
    );
  }
      
  // Get posts by authorId (within 'author' field)
  getPostsByAuthorId(authorId: number): Observable<Post[]> {
    return this.getPosts().pipe(
      map(posts => posts.filter(post => post.author.id === authorId))
    );
  }

  addPost(post: Post): Observable<Post> {
    const newPost = {
      title: "no",
      content: post.content,
      authorId: post.author.id,
      status: 0,
      image: ""
    };
    
    return this.http.post<Post>(this.apiUrl, newPost, this.httpOptions);
  }


  addComment(comment: PostComment): Observable<PostComment>{
    const newComment = {
      postId : comment.PostId,
      commenterId: comment.UserId,
      content: comment.content
    }
    return this.http.post<PostComment>(this.commentUrl,newComment,this.httpOptions)
  }

  deleteComment(comment: PostComment) : Observable<void> {
    const commentToBeDeleted = {
      commentId  : comment.id
    }
    const url = `${this.commentUrl}${comment.id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }

  updateComment(comment: PostComment) : Observable<PostComment>{
    const commentToBeEdited=  {
      id : comment.id,
      content: comment.content
    }
    const url = `${this.commentUrl}${comment.id}`
    return this.http.put<PostComment>(url,commentToBeEdited,this.httpOptions)
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.apiUrl}${post.id}`;
    const updatedPost = {
      title: "",
      content: post.content,
      image: "",
      createdAt: post.createdAt,
      author: {
        id: post.author.id,
        userName: post.author.userName,
        email: post.author.email,
        bio: post.author.bio,
        profilePicture: post.author.profilePicture,
        followings: post.author.followings
      },
      comments: post.comments.map((comment: any) => ({
        id: comment.id,
        postId: comment.PostId, 
        commenterId: comment.UserId,
        commenterName: "",
        content: comment.content,
        createdAt: new Date(comment.createdAt)
      })),
      isFollowedAuthor: true
    };

    console.log(updatedPost)
    return this.http.put<Post>(url, updatedPost, this.httpOptions);
  }

  deletePost(postId: number): Observable<void> {
    const url = `${this.apiUrl}${postId}`;
    return this.http.delete<void>(url, this.httpOptions);
  }
}
