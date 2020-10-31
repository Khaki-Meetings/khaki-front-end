import {Component, OnInit} from '@angular/core';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {OrganizersStatisticsFacadeService} from "../../state/facades/organizers-statistics-facade.service";




@Component({
  selector: 'lib-organizers-table',
  templateUrl: './organizers-table.component.html',
  styleUrls: ['./organizers-table.component.scss']
})
export class OrganizersTableComponent implements OnInit {
  organizersStatistics: OrganizersStatisticsSm;
  displayedColumns: string[] = ['person', 'meeting', 'hours', 'costs'];


  constructor(private organizersStatisticsService: OrganizersStatisticsFacadeService) {
  }

  // obs returns =>
  // organizersStatistics;
  ngOnInit(): void {
    this.loadOrganizerStatistics();
    console.log('org', this.organizersStatistics);
  }

  loadOrganizerStatistics() {
    this.organizersStatisticsService.organizersStatistics().subscribe(
      availableInfoFromServer => {
        this.organizersStatistics = availableInfoFromServer;
        console.log('obs -->', this.organizersStatistics);
      }
    );
  }
}
