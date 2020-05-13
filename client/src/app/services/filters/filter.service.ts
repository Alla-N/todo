import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import Itodo from "../todo/Itodo";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filter = new BehaviorSubject('');

  constructor() { }

  getFilter(): Observable<any> {
    return this.filter;
  }

  setFilter(value) {
    this.filter.next(value);
  }

}
