import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  // private apiUrl = 'https://c856-41-199-138-62.ngrok-free.app/api/Authors'
  // private newApiUrl = 'http://localhost:5108/api/Authors'

  private apiUrl = 'https://c856-41-199-138-62.ngrok-free.app/api/Authors'
  private newApiUrl = 'https://c856-41-199-138-62.ngrok-free.app/api/Authors'

  // add a header to all request
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "ngrok-skip-browser-warning": "69420"
    })
  };

  constructor(private http: HttpClient) { }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.newApiUrl, this.httpOptions);
  }

  getAllAuthor(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl, this.httpOptions);
  }

  getFriends(friendIds: number[]): Observable<Author[]> {
    return this.getAllAuthor().pipe(
      map((authors: Author[]) => {
        const friends = authors.filter(author => friendIds.includes(+author.id));
        return friends;
      })
    );
  }

  getAuthor(authorId: string): Observable<Author> {
    return this.http.get<Author[]>(this.apiUrl, this.httpOptions).pipe(
      map((authors: Author[]) => {
        const specificAuthor = authors.find(author => +author.id === +authorId);
        if (!specificAuthor) {
          throw new Error(`Author with id ${authorId} not found`);
        }
        return specificAuthor;
      })
    );
  }

  updateAuthor(author: Author): Observable<Author> {
    const url = `${this.apiUrl}/${author.id}`;
    return this.http.put<Author>(url, author, this.httpOptions);
  }

  authorLogIn(authorEmail: string, authorPassword: string): Observable<Author | null> {
    return this.http.get<Author[]>(this.apiUrl, this.httpOptions).pipe(
      map((authors: Author[]) => {
        const specificAuthor = authors.find(author => author.userName === authorEmail);
        if (specificAuthor && specificAuthor.password === authorPassword) {
          return specificAuthor;
        }
        return null;
      })
    );
  }

  addFriend(author: Author): Observable<Author> {
    const url = `${this.apiUrl}/${author.id}`;
    return this.http.put<Author>(url, author, this.httpOptions);
  }
}