import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-profile-name',
  templateUrl: './profile-name.component.html',
  styleUrls: ['./profile-name.component.scss']
})
export class ProfileNameComponent implements OnInit {

  constructor() { }

  editmode = false;
  ngOnInit(): void {
  }

  onChange(): void {
    this.editmode = true;
  }

  onSave(): void {
    this.editmode = false;
  }

  onCancel(): void {
    this.editmode = false;
  }
}
