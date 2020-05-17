import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {StoreService} from '../store/store.service';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filter = new BehaviorSubject('');

  constructor(private storeService: StoreService) { }

  getFilter(): Observable<any> {
    return this.filter.asObservable();
  }

  setFilter(id) {
    this.filter.next(id);
    this.storeService.setActiveFilter(id);
  }

}
