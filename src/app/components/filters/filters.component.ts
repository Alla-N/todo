import {Component, Input, OnInit} from '@angular/core';
import { FilterService } from '../../services/filters/filter.service';
import { StoreService } from '../../services/store/store.service';
import Filter from '../../services/filters/Filter';

@Component({
  selector: 'app-aside',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filtersArray: Filter[];

  constructor(private filterService: FilterService, private storeService: StoreService) {
    this.storeService.getFiltersArray()
      .subscribe(data => {
        this.filtersArray = data;
      });
  }

  ngOnInit(): void {
  }

  changeFilter(id) {
    this.filterService.setFilter(id);
  }

}
