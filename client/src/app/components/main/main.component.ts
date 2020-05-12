import { Component, OnInit, Output } from '@angular/core';
import Itodo from '../../services/todo/Itodo';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  todoList: Itodo[];
  @Output()
  state = {
    step: -1
  };

  constructor(private storeService: StoreService) {
    this.storeService.getData().subscribe(data => {
      this.todoList = data;
    });
  }

  ngOnInit(): void {
  }

}
