import {Component, OnInit} from '@angular/core';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {OrganizersStatisticsFacadeService} from "../../state/facades/organizers-statistics-facade.service";
import {OrganizerStatisticsSm} from "../../state/models/organizer-statistics-sm";
import {OrganizerSm} from "../../state/models/organizerSm";




@Component({
  selector: 'lib-organizers-table',
  templateUrl: './organizers-table.component.html',
  styleUrls: ['./organizers-table.component.scss']
})
export class OrganizersTableComponent implements OnInit {
  private organizer: OrganizerSm = {email: "bob@bob.com", imageUrl: "", name: "Bob Jones"};
  private organizerStat: OrganizerStatisticsSm = {organizer: this.organizer, totalCost: 100, totalHours: 222, totalMeetings: 2};
  organizersStatistics: OrganizersStatisticsSm = {
    errors: [], organizers: [
      this.organizerStat
    ], page: 1

  };
  displayedColumns: string[] = ['name', 'meeting', 'hours', 'costs'];


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
