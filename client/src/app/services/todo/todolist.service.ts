import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Itodo from '../todo/Itodo';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
  return(error: any): Observable<T> => {
    alert(error.name);
    console.error(error);
    return of(result as T);
  };
  }

  getTodos(): Observable<Itodo[]> {
    return this.http.get<Itodo[]>(
      'api/todo', httpOptions)
          .pipe(
            tap(() => console.log('Fetched todo')),
            catchError(this.handleError('getTodo', []))
          );
  }

  addTodo(form): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http.post<any>(
      'api/todo', form, {headers})
      .pipe(
        catchError(this.handleError('addTodo', [])),
        map(res => res)
      );
  }

  updateTodo(id: string, todo: Itodo): Observable<any> {
    return this.http.put<any>(`api/todo/${id}`, todo, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateTodo')),
        map(res => res)
      );
  }

  toggleTodo(id: string, todo: Itodo): Observable<any> {
    return this.http.put<any>(`api/todo/${id}/complete`, todo, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateTodo')),
        map(res => res)
      );
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(
      `api/todo/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteTodo')),
        map(res => res)
      );

  }
}
