import { Component, Input, OnInit, Output } from '@angular/core';
import Itodo from '../../services/todo/Itodo';
import { StoreService } from '../../services/store/store.service';
import { FilterService } from '../../services/filters/filter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  todoList: Itodo[];
  showList: Itodo[];
  filter: string;
  @Output()
  accordionState = {
    step: -1
  };

  @Input() appState;
  @Input() search;

  constructor(private storeService: StoreService, private filterService: FilterService) {
    this.storeService.getData().subscribe(data => {
      this.todoList = data;
      this.showList = this.todoList;

    });

    this.filterService.getFilter().subscribe(data => {
      console.log(data);
      this.filterTodo(data);
    });
  }

  ngOnInit(): void {
    console.log(this.search);
  }

  filterTodo(data) {
    console.log('Filter works');
    switch (data) {
      case 'today':
        console.log('Filter: today');
        this.showList = this.todoList.filter(i => i.deadline === new Date());
        break;
      case 'upcoming':
        console.log('Filter: upcoming');
        this.showList = this.todoList.filter(i => i.deadline > new Date());
        break;
      case 'expired':
        console.log('Filter: expired');
        this.showList = this.todoList.filter(i => i.deadline < new Date());
        break;
      case 'completed':
        console.log('Filter: completed');
        this.showList = this.todoList.filter(i => i.completed === true);
        break;
      case 'uncompleted':
        console.log('Filter: completed');
        this.showList = this.todoList.filter(i => i.completed !== true);
        break;
      default:
        console.log('Filter: no filter');
        this.showList = this.todoList;
        break;
    }
  }

}
