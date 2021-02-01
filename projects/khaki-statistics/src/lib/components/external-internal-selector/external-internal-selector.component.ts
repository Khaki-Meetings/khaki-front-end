import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';
import {StatisticsScopeSe} from '../../state/statistics-filters/statistics-scope-se.enum';

@Logging
@Component({
  selector: 'lib-external-internal-selector',
  templateUrl: './external-internal-selector.component.html',
  styleUrls: ['./external-internal-selector.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExternalInternalSelectorComponent implements OnInit {
  constructor(private statisticsFiltersFacade: StatisticsFiltersFacade) {
  }

  private logger: HistorianService;

  form: FormGroup;
  filterControl: FormControl;
  meetingTypeOptions =
    [
      {value: StatisticsScopeSe.Internal},
      {value: StatisticsScopeSe.External}
    ];

  private filterControlValueChange = (filterString) => {
    this.logger.debug('value changed', filterString);
    this.statisticsFiltersFacade.dispatchSetStatisticsScope(StatisticsScopeSe[filterString]);
  };

  ngOnInit(): void {
    this.filterControl = new FormControl();
    this.form = new FormGroup(
      {
        filter: this.filterControl
      }
    );
    this.filterControl.valueChanges.subscribe(this.filterControlValueChange);
    this.statisticsFiltersFacade.selectCurrentStatisticsScope().subscribe(filter => this.filterControl.setValue(filter));
  }
}
