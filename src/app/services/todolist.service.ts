import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Itodo from './Itodo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Itodo[]> {
    return this.http.get<Itodo[]>('https://jsonplaceholder.typicode.com/todos');
  }
}
