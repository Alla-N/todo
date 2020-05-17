import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store/store.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  minDate = new Date();
  public addTodoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storeService: StoreService
  ) {
    this.addTodoForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      deadline: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  public add() {
    if (this.addTodoForm.valid){
      this.addTodoForm.controls.deadline.setValue((this.addTodoForm.value.deadline.toDateString()));
      this.storeService.addTodoList(this.addTodoForm.value);
    }else{
      alert('Form does not valid');
    }
  }

}
