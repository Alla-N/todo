import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import Itodo from '../services/Itodo';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  minDate = new Date();
  task: Itodo = {
    id: '1',
    userId: '1',
    title: '',
    completed: false,
    deadline: new Date(),
    priority: '',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
