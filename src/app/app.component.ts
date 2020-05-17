import {Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){}
  search: string;
  title = 'todo';
  menuMode = 'side';

  opened = false;

  @ViewChild('sidenav') sidenav: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 500) {
      this.sidenav.mode = 'over';
    } else {
      this.sidenav.mode = 'side';
    }
  }


  onSearch(search: string): void {
    this.search = search;
    console.log('Search from app - ', this.search);
  }

}
