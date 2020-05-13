import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {StoreService} from '../../services/store/store.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  minDate = new Date();
  public editTodoForm: FormGroup;
  disabled = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storeService: StoreService
  ) {
    this.editTodoForm = new FormGroup({
      title: new FormControl(this.data.task.title),
      deadline: new FormControl(this.data.task.deadline),
      priority: new FormControl(this.data.task.priority),
    });

  }

  ngOnInit(): void {
    this.editTodoForm.statusChanges.subscribe((status) => {
      this.disabled = status !== 'VALID';
    });
  }

  public edit() {
    if (this.editTodoForm.status === 'VALID') {
      this.editTodoForm.controls.deadline.setValue((this.editTodoForm.value.deadline.toDateString()));
      this.storeService.editTodoList(this.data.task._id, this.editTodoForm.value);
    } else {
      alert('Form does not valid');
    }
  }

}
