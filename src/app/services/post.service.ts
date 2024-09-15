import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5000/posts'
  
  constructor(private http:HttpClient){}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl); 
  }

  getPostsByAuthorId(authorId: number): Observable<Post[]> {
    return this.getPosts().pipe(
      map(posts => posts.filter(post => post.userId.toString() === authorId.toString())),
    );
  }

  addPost(post: Post): Observable<Post> {
    const newPost = {
      ...post,
      id: post.id.toString()
    };
    
    return this.http.post<Post>(this.apiUrl, newPost);
  }



  updatePost(post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<Post>(url, post);
  }

  deletePost(postId: string): Observable<void> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.delete<void>(url);
  }
  

}
