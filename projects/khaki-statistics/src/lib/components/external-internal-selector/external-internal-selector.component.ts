import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HistorianService, Logging} from '@natr/historian';
import {BaseIntervalComponent} from '../base-interval.component';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';

@Logging
@Component({
  selector: 'lib-external-internal-selector',
  templateUrl: './external-internal-selector.component.html',
  styleUrls: ['./external-internal-selector.component.scss']
})
export class ExternalInternalSelectorComponent extends BaseIntervalComponent implements OnInit {
  constructor(private statisticsFiltersFacade: StatisticsFiltersFacade) {
    super();
  }

  private logger: HistorianService;

  form: FormGroup;
  filterControl: FormControl;
  meetingTypeOptions =
    [{ value: StatisticsScopeSe.Internal,
       text: this.formatMeetingTypeDetail(StatisticsScopeSe.Internal) },
     { value: StatisticsScopeSe.External,
       text: this.formatMeetingTypeDetail(StatisticsScopeSe.External)
     }];

  private filterControlValueChange = (filterString) => {
    this.logger.debug('value changed', filterString);
    this.statisticsFiltersFacade.setStatisticsFilter(StatisticsScopeSe[filterString]);
  }

  ngOnInit(): void {
    this.filterControl = new FormControl();
    this.form = new FormGroup(
      {
        filter: this.filterControl
      }
    );
    this.filterControl.valueChanges.subscribe(this.filterControlValueChange);
    this.statisticsFiltersFacade.currentStatisticsFilter().subscribe(filter => this.filterControl.setValue(filter));
  }
}
