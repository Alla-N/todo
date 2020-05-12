import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {TodoListService} from '../../services/todo/todolist.service';

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
    private todoService: TodoListService
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
      console.log(this.editTodoForm.value);
      this.editTodoForm.controls.deadline.setValue((this.editTodoForm.value.deadline.toISOString()).split('T')[0]);
      console.log(this.editTodoForm.value);
      console.log(typeof this.editTodoForm.value.deadline);

      this.todoService.updateTodo(this.data.task._id, this.editTodoForm.value)
        .subscribe(data => {
          alert(data.message);
        });

    } else {
      alert('Form does not valid');
    }
  }

}
