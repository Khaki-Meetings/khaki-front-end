import { Component, OnInit } from '@angular/core';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';

@Component({
  selector: 'lib-organizers-table',
  templateUrl: './organizers-table.component.html',
  styleUrls: ['./organizers-table.component.scss']
})
export class OrganizersTableComponent implements OnInit {
  organizersStatistics: OrganizersStatisticsSm;

  constructor() { }

  ngOnInit(): void {
  }

}
