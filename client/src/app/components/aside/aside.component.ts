import {Component, Input, OnInit} from '@angular/core';
import { FilterService } from '../../services/filters/filter.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
  }

  changeFilter(filter) {
    this.filterService.setFilter(filter);
  }

}
