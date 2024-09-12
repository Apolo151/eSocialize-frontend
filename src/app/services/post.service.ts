import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Post } from '../models/post';
import { mockPosts } from '../mock/mock-posts'; 

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor() { }

  getPosts(): Observable<Post[]> {
    return of(mockPosts); 
  }
}
