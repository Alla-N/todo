import { Component, Input, OnInit, Output } from '@angular/core';
import Todo from '../../services/todo/Todo';
import { StoreService } from '../../services/store/store.service';
import { FilterService } from '../../services/filters/filter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  todoList: Todo[];
  showList: Todo[];
  filter: string;
  step = -1;


  @Input() search;

  constructor(private storeService: StoreService, private filterService: FilterService) {
    this.storeService.getData().subscribe(data => {
      this.todoList = data;
      this.showList = this.todoList;

    });

    this.filterService.getFilter().subscribe(data => {
      this.filter = data;
      this.filterTodo(data);
    });
  }

  ngOnInit(): void {
  }

  filterTodo(data) {
    switch (data) {
      case 'today':
        this.showList = this.todoList.filter(i => i.deadline === new Date());
        break;
      case 'upcoming':
        this.showList = this.todoList.filter(i => i.deadline > new Date());
        break;
      case 'expired':
        this.showList = this.todoList.filter(i => i.deadline < new Date());
        break;
      case 'completed':
        this.showList = this.todoList.filter(i => i.completed === true);
        break;
      case 'uncompleted':
        this.showList = this.todoList.filter(i => i.completed !== true);
        break;
      default:
        this.showList = this.todoList;
        break;
    }
  }

}
