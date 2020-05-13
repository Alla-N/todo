import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreateComponent } from '../create/create.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() appState;

  constructor(public dialog: MatDialog, private router: Router){
  }

  @Output() searchChange = new EventEmitter();

  onSearch(event): void {
    this.searchChange.emit(event.target.value);
    console.log('From header - ', event.target.value);
  }

  ngOnInit(): void {}

  createTask() {
    this.dialog.open(CreateComponent);
  }

  toggleSideBar() {
    this.appState.opened = !this.appState.opened;
  }

}
