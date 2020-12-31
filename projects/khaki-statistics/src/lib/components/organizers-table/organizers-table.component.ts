import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {OrganizersStatisticsSm} from '../../state/models/organizers-statistics-sm';
import {OrganizersStatisticsFacadeService} from '../../state/facades/organizers-statistics-facade.service';
import {HistorianService, Logging} from '@natr/historian';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {OrganizerStatisticsSm} from '../../state/models/organizer-statistics-sm';
import {IntervalEnum} from '../../services/models/interval.enum';
import {CurrentTimeIntervalFacadeService} from '../../state/facades/current-time-interval-facade.service';

@Logging
@Component({
  selector: 'lib-organizers-table',
  templateUrl: './organizers-table.component.html',
  styleUrls: ['./organizers-table.component.scss']
})

export class OrganizersTableComponent implements OnInit, AfterViewInit {
  private logger: HistorianService;
  organizersStatistics: OrganizersStatisticsSm;
  displayedColumns: string[] = ['name', 'meeting', 'hours'];

  dataSource: OrganizerStatisticsSm[] = [];

  currentTimeInterval: IntervalEnum;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(
    private organizersStatisticsFacade: OrganizersStatisticsFacadeService,
    private currentTimeIntervalFacade: CurrentTimeIntervalFacadeService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.logger.debug('paginator is', this.paginator);
    this.organizersStatisticsFacade.organizersStatistics()
      // .pipe(tap(data => this.logger.debug('subscription', data)))
      .subscribe(organizersStatistics => {
        this.logger.debug('onInit organizersStatistics', organizersStatistics);
        this.organizersStatistics = organizersStatistics;
        this.dataSource = organizersStatistics.content;
        this.paginator.length = organizersStatistics.totalElements;
        this.paginator.pageSize = organizersStatistics.size;
      });
  }

  pageChange(event: PageEvent): void {
    this.logger.debug('page change event', event);
    this.currentTimeIntervalFacade
      .currentTimeInterval()
      .subscribe(
        currentInterval => this.organizersStatisticsFacade.requestOrganizersStatistics(currentInterval, event.pageSize, event.pageIndex)
      );
  }
}
