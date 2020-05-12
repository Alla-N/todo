import { Component, OnInit, Input } from '@angular/core';
import { CreateComponent } from '../create/create.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  constructor(public dialog: MatDialog, private router: Router){
  }

  ngOnInit(): void {}

  createTask() {
    this.dialog.open(CreateComponent);
  }

  toggleSideBar() {
    this.state.opened = !this.state.opened;
  }

}
