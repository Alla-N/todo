import {Component, OnInit, Input, Output} from '@angular/core';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  tasksToday = 5;
  tasksCompleted = 0;
  tasksOverdue = 2;

  @Input() state;

  constructor(public dialog: MatDialog){}

  ngOnInit(): void {}

  createTask() {
    this.dialog.open(DialogComponent);
  }

  toggleSideBar() {
    this.state.opened = !this.state.opened;
  }

}
