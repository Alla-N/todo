import { Pipe, PipeTransform } from '@angular/core';
import Itodo from '../services/todo/Itodo';

@Pipe({
  name: 'todosSearch',
})
export class TodosSearchPipe implements PipeTransform {
  transform(todos: Itodo[], search: string = ''): Itodo[] {
    if (!search.trim()) {
      return todos;
    }

    return todos.filter((todo) => {
      return todo.title.toLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
    });
  }
}
