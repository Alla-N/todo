import {Component, ElementRef, ViewChild, AfterViewInit, Output} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  constructor(){}
  search: string;
  title = 'todo';
  menuMode = 'side';

  @Output()
  appState = {
    opened: false,
  };

  @ViewChild('wrapper') elem: ElementRef;

  onSearch(search: string): void {
    this.search = search;
    console.log('Search from app - ', this.search);
  }

  ngAfterViewInit() {
    if (this.elem.nativeElement.offsetWidth <= 700) {
      this.menuMode = 'over';
    } else {
      this.menuMode = 'side';
    }
  }

}
