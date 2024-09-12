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



  // removePost(postId: number): void {
  //   this.posts = this.posts.filter(post => post.id !== postId);
  // }

}
