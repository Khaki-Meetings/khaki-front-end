import {Component, OnInit} from '@angular/core';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {OrganizersStatisticsFacadeService} from '../../state/facades/organizers-statistics-facade.service';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'lib-organizers-table',
  templateUrl: './organizers-table.component.html',
  styleUrls: ['./organizers-table.component.scss']
})

export class OrganizersTableComponent implements OnInit {
  private logger: HistorianService;
  organizersStatistics: OrganizersStatisticsSm;
  displayedColumns: string[] = ['name', 'meeting', 'hours'];


  constructor(private organizersStatisticsService: OrganizersStatisticsFacadeService) {
  }

  ngOnInit(): void {
    this.organizersStatisticsService.organizersStatistics()
      // .pipe(tap(data => this.logger.debug('subscription', data)))
      .subscribe(organizersStatistics => {
        this.logger.debug('onInit', organizersStatistics);
        this.organizersStatistics = this.createTableData(organizersStatistics);
      });
  }

  private createTableData(organizerStatistics: OrganizersStatisticsSm): OrganizersStatisticsSm {
    var organizersStatisticsSm: OrganizersStatisticsSm = {
      page: organizerStatistics.page,
      organizersStatistics: organizerStatistics.organizersStatistics.map(
        organizersStatistic => {
          return {
            organizerFirstName: organizersStatistic.organizerFirstName,
            organizerLastName: organizersStatistic.organizerLastName,
            totalCost: organizersStatistic.totalCost,
            totalMeetings: organizersStatistic.totalMeetings,
            totalSeconds: organizersStatistic.totalSeconds,
            formattedTime: Math.trunc(organizersStatistic.totalSeconds / 60 / 60) + ' hrs, '
              + Math.trunc(organizersStatistic.totalSeconds / 60 % 60) + ' min',
            organizerEmail: organizersStatistic.organizerEmail
          };
        }
      ),
      errors: organizerStatistics.errors
    };
    return organizersStatisticsSm;
  }
}
