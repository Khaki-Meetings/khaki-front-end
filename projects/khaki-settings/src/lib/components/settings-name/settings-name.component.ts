import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-settings-name',
  templateUrl: './settings-name.component.html',
  styleUrls: ['./settings-name.component.scss']
})
export class SettingsNameComponent implements OnInit {

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
