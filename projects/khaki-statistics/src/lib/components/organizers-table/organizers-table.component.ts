import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";
import {OranizersStatisticsService} from "../../state/facades/oranizers-statistics.service";
export interface PeriodicElement {
  person: string;
  meeting: number;
  hours: number;
  costs: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {meeting: 1, person: 'Hydrogen', hours: 1.0079, costs: 1},
  {meeting: 2, person: 'Helium', hours: 4.0026, costs: 2},
  {meeting: 3, person: 'Lithium', hours: 6.941, costs: 3},
  {meeting: 4, person: 'Beryllium', hours: 9.0122, costs: 3},
  {meeting: 5, person: 'Boron', hours: 10.811, costs: 4},
  {meeting: 6, person: 'Carbon', hours: 12.0107, costs: 3},
  {meeting: 7, person: 'Nitrogen', hours: 14.0067, costs: 2},
  {meeting: 8, person: 'Oxygen', hours: 15.9994, costs: 4},
  {meeting: 9, person: 'Fluorine', hours: 18.9984, costs: 7},
  {meeting: 10, person: 'Neon', hours: 20.1797, costs: 9},
];

@Component({
  selector: 'lib-organizers-table',
  templateUrl: './organizers-table.component.html',
  styleUrls: ['./organizers-table.component.scss']
})
export class OrganizersTableComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;


  constructor(private organizersStatisticsService: OranizersStatisticsService) { }

  // obs returns =>
  organizersStatistics;
  ngOnInit(): void {
    this.loadOrganizerStatistics()
  }

  loadOrganizerStatistics() {
    this.organizersStatisticsService.getOrganizerInfo().subscribe(
      availableInfoFromServer => {
        this.organizersStatistics = availableInfoFromServer;
        console.log('obs -->', this.organizersStatistics);
      }
    );
  }
}
