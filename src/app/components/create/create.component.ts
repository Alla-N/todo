import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  minDate = new Date();
  public addTodoForm: FormGroup;
  disabled = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storeService: StoreService
  ) {
    this.addTodoForm = new FormGroup({
      title: new FormControl(),
      deadline: new FormControl(),
      priority: new FormControl()
    });
  }

  ngOnInit(): void {
    this.addTodoForm.statusChanges.subscribe((status) => {
      this.disabled = status !== 'VALID';
    });
  }

  public add() {
    if (this.addTodoForm.status === 'VALID'){
      this.addTodoForm.controls.deadline.setValue((this.addTodoForm.value.deadline.toDateString()));
      this.storeService.addTodoList(this.addTodoForm.value);
    }else{
      alert('Form does not valid');
    }
  }

}
