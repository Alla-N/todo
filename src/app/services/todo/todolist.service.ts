import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Todo from './Todo';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};
// const url = 'http://localhost:8080/';
const url = '';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
  return(error: any): Observable<T> => {
    console.error('Error -', error);
    return of(result as T);
  };
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      `${url}api/todo`, httpOptions)
          .pipe(
            tap(() => console.log('Get todo')),
            catchError(this.handleError('getTodo', []))
          );
  }

  addTodo(form): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http.post<any>(
      `${url}api/todo`, form, {headers})
      .pipe(
        catchError(this.handleError('addTodo', [])),
        map(res => res)
      );
  }

  updateTodo(id: string, todo: Todo): Observable<any> {
    return this.http.put<any>(`${url}api/todo/${id}`, todo, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateTodo')),
        map(res => res)
      );
  }

  toggleTodo(id: string, todo: Todo): Observable<any> {
    return this.http.put<any>(`${url}api/todo/${id}/complete`, todo, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateTodo')),
        map(res => res)
      );
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(
      `${url}api/todo/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError<any>('deleteTodo')),
        map(res => res)
      );

  }
}
