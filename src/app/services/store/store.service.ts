import {Injectable} from '@angular/core';
import Todo from '../todo/Todo';
import {TodoListService} from '../todo/todolist.service';
import {BehaviorSubject, Observable} from 'rxjs';
import Filter from '../filters/Filter';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  todoList = new BehaviorSubject([]);
  messages = new BehaviorSubject('');
  filtersArray = new BehaviorSubject<Filter[]>([
    {
      id: 'today',
      matIcon: 'today',
      title: 'Today tasks',
      active: false,
    },
    {
      id: 'upcoming',
      matIcon: 'view_comfy',
      title: 'Upcoming tasks',
      active: false,
    },
    {
      id: 'expired',
      matIcon: 'history',
      title: 'Expired tasks',
      active: false,
    },
    {
      id: 'completed',
      matIcon: 'check_circle',
      title: 'Completed tasks',
      active: false,
    },
    {
      id: 'uncompleted',
      matIcon: 'error_outline',
      title: 'Uncompleted tasks',
      active: false,
    },
    {
      id: 'clear',
      matIcon: 'clear',
      title: 'Clear filter',
      active: false,
    },
  ]);

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
        const newTask = data.todo;
        newTask.deadline = new Date(data.todo.deadline);
        this.todoList.next([...this.todoList.getValue(), newTask]);
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
            i.deadline = new Date(data.todo.deadline);
            return i;
          }else{
            return i;
          }
        })]);
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
        })]);
      });
  }

  getData(): Observable<Todo[]> {
    return this.todoList.asObservable();
  }

  getMessages(): Observable<any> {
    return this.messages.asObservable();
  }

  getFiltersArray(): Observable<any> {
    return this.filtersArray.asObservable();
  }

  setActiveFilter(id) {
    this.filtersArray.next([...this.filtersArray.getValue().map(i => {
        if (i.id === id) {
          i.active = true;
          return i;
        } else {
          i.active = false;
          return i;
        }
      }
    )]);
  }

}
