import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:5000/posts'
  constructor(private http:HttpClient){}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl); 
  }


  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }



  updatePost(post: Post): Observable<Post> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<Post>(url, post);
  }

  deletePost(postId: number): Observable<void> {
    const url = `${this.apiUrl}/${postId}`;
    return this.http.delete<void>(url);
  }
  

}
