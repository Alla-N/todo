import {Injectable} from '@angular/core';
import Itodo from '../todo/Itodo';
import {TodoListService} from '../todo/todolist.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  todoList = new BehaviorSubject([]);
  messages = new BehaviorSubject('');

  constructor(private todoService: TodoListService) {
    this.getTodoList();
  }

  getTodoList(): void {
    this.todoService.getTodos()
      .subscribe(data => {
        data.map(i => i.deadline = new Date(i.deadline));
        this.todoList.next(data);
      });
  }

  addTodoList(todo): void {
    this.todoService.addTodo(todo)
      .subscribe(data => {
        this.messages.next(data.message);
        this.todoList.next([...this.todoList.getValue(), data.todo]);
      });
  }

  deleteTodoList(id): void {
    this.todoService.deleteTodo(id)
      .subscribe(data => {
        this.messages.next(data.message);
        this.todoList.next(this.todoList.getValue().filter(i => i._id !== id));
      });
  }

  editTodoList(id, form): void {
    this.todoService.updateTodo(id, form)
      .subscribe(data => {
        this.messages.next(data.message);
        this.todoList.next([...this.todoList.getValue().map(i => {
          if (i._id === id) {
            i = data.todo;
            return i;
          }else{
            return i;
          }
        }), data.todo]);
      });
  }

  toggleTodoList(id, form): void {
    this.todoService.toggleTodo(id, form)
      .subscribe(data => {
        this.messages.next(data.message);
        this.todoList.next([...this.todoList.getValue().map(i => {
          if (i._id === id) {
            i.completed = data.todo.completed;
            return i;
          }else{
            return i;
          }
        }), data.todo]);
      });
  }

  getData(): Observable<Itodo[]> {
    return this.todoList;
  }

  getMessages(): Observable<any> {
    return this.messages;
  }

}
