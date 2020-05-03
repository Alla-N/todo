import { Component, OnInit } from '@angular/core';
import Itodo from '../services/Itodo';
import {TodoListService} from '../services/todolist.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  todoList: Itodo[];
  step = 0;

  constructor(private todoService: TodoListService, private snackBar: MatSnackBar) {
    this.todoService.getTodos()
      .subscribe((data) => {
        const newArr = [];
        data.forEach(i => {
          const newItem = {
            ...i,
            deadline: this.getRandomDeadline(),
            priority: this.getRandomPriority()
          };
          newArr.push(newItem);
        });

        this.todoList = newArr.filter((i, index) => index < 11);
      });
  }

  ngOnInit(): void {
  }

  getRandomPriority() {
    const  priorityList = ['low', 'medium', 'critical'];
    return priorityList[Math.round(Math.random() * (priorityList.length - 1))];
  }

  getRandomDeadline() {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + Math.random() * 20);

    return newDate;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  openSnackBar(message, action, event) {
    const snackBarRef = this.snackBar.open(message, action, {duration: 4000});
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar was dismissed');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('Item deleted');
      // this.todoList = this.todoList.filter(i => i.id !== event.target.id);
    });
  }

}
