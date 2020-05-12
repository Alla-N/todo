import {Component, Input, OnInit} from '@angular/core';
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
  @Input() task;
  @Input() index;
  @Input() state;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private storeService: StoreService) {
  }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.state.step = index;
  }

  nextStep() {
    this.state.step++;
  }

  prevStep() {
    this.state.step--;
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

}
