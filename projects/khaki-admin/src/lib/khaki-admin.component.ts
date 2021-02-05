import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-khaki-admin',
  template: `
    Admin:
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class KhakiAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
