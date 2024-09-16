import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';


@Injectable({
  providedIn: 'root'
})

export class AuthorsService {

  private apiUrl = 'http://localhost:5000/Authors'
  private newApiUrl = 'https://c856-41-199-138-62.ngrok-free.app/api/Authors'
  constructor(private http:HttpClient) { }

  getAllAuthor(): Observable<Author[]>{
    return this.http.get<Author[]>(this.newApiUrl)
  }
 
/*  getAllAuthor(): Observable<Author[]>{
    return this.http.get<Author[]>(this.apiUrl);
  }
*/
  getFriends(friendIds: number[]): Observable<Author[]> {
    return this.getAllAuthor().pipe(
      map((authors: Author[]) => {
        const friends = authors.filter(author => friendIds.includes(+author.id));
        return friends;
      })
    );
  }

  getAuthor(authorId: string): Observable<Author> {
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

  updateAuthor(author: Author): Observable<Author> {
    const url = `${this.apiUrl}/${author.id}`;
    return this.http.put<Author>(url, author); 
  }

  authorLogIn(authorEmail: string, authorPassword: string): Observable<Author | null>{
    return this.http.get<Author[]>(this.apiUrl).pipe(
      map((authors: Author[]) =>{
        const specificAuthor = authors.find(author => author.userName === authorEmail);
        if(specificAuthor && specificAuthor.password === authorPassword)
        {
          return specificAuthor  
        }
        return null
        // throw new Error(`Author with email ${authorEmail} not found or this is not the password`);

      })
    );
  }

  addFriend(author: Author): Observable<Author> {
    const url = `${this.apiUrl}/${author.id}`;
    return this.http.put<Author>(url, author);
  }

}
