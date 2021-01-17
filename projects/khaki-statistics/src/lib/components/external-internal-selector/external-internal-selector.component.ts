import {Component, OnInit} from '@angular/core';
import {StatisticsFilterSe} from '../../state/models/statistics-filter-se';
import {StatisticsFiltersFacadeService} from '../../state/facades/statistics-filters-facade.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HistorianService, Logging} from '@natr/historian';
import {BaseIntervalComponent} from '../base-interval.component';

@Logging
@Component({
  selector: 'lib-external-internal-selector',
  templateUrl: './external-internal-selector.component.html',
  styleUrls: ['./external-internal-selector.component.scss']
})
export class ExternalInternalSelectorComponent extends BaseIntervalComponent implements OnInit {
  constructor(private statisticsFiltersFacade: StatisticsFiltersFacadeService) {
    super();
  }

  private logger: HistorianService;

  form: FormGroup;
  filterControl: FormControl;
  meetingTypeOptions =
    [{ value: StatisticsFilterSe.Internal,
       text: this.formatMeetingTypeDetail(StatisticsFilterSe.Internal) },
     { value: StatisticsFilterSe.External,
       text: this.formatMeetingTypeDetail(StatisticsFilterSe.External)
     }];

  private filterControlValueChange = (filterString) => {
    this.logger.debug('value changed', filterString);
    this.statisticsFiltersFacade.setStatisticsFilter(StatisticsFilterSe[filterString]);
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
