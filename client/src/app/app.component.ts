import {Component, ElementRef, ViewChild, AfterViewInit, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'todo';
  menuMode = 'side';
  @Output()
  state = {
    opened: false
  };

  @ViewChild('wrapper') elem: ElementRef;

  ngAfterViewInit() {
    if (this.elem.nativeElement.offsetWidth <= 700) {
      this.menuMode = 'over';
    } else {
      this.menuMode = 'side';
    }
  }

  constructor(){}

}
