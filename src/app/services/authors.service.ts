import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthorsService {

  private apiUrl = 'http://localhost:5000/Authors'
  constructor(private http:HttpClient) { }

  getFriends(authorId: number) : Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl).pipe(
      map((authors: Author[]) => {
        const specificAuthor = authors.find(author => author.id === authorId);
        return specificAuthor ? specificAuthor.friends : [];
      }),
      map((friends: Author[] | undefined) => friends ?? [])
    );
  }

  getAuthor(authorId: number): Observable<Author> {
    return this.http.get<Author[]>(this.apiUrl).pipe(
      map((authors: Author[]) => {
        const specificAuthor = authors.find(author => +author.id === +authorId);
        if (!specificAuthor) {
          throw new Error(`Author with id ${authorId} not found`);
        }
        return specificAuthor;
      })
    );
  }

}
