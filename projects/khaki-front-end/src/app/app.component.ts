import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'khaki-front-end';
  show = false;
  toggleDrawerShow(): void {
    this.show = !this.show;
  }
  onNavigateBtn(): void {
    this.show = false;
  }
}
