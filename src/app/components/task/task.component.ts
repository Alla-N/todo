import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {EditComponent} from '../edit/edit.component';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  today = new Date();
  @Input() task;
  @Input() index;
  @Input()step;
  @Output() stepChange = new EventEmitter<number>();

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private storeService: StoreService) {
  }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
    this.stepChange.emit(this.step);
  }

  nextStep() {
    this.step++;
    this.stepChange.emit(this.step);
  }

  prevStep() {
    this.step--;
    this.stepChange.emit(this.step);
  }

    deleteTask(message, action, event) {
    const snackBarRef = this.snackBar.open(message, action, {duration: 4000});
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar was dismissed');
    });
    snackBarRef.onAction().subscribe(() => {
      this.storeService.deleteTodoList(this.task._id);
    });
  }

  editTask() {
    this.dialog.open(EditComponent, {
      data: {
        task: this.task
      }
    });
  }

  toggleTask(state) {
    this.storeService.toggleTodoList(this.task._id, {completed: state});
  }

}
