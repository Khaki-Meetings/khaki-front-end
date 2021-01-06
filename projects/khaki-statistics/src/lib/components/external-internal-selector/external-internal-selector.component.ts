import {Component, OnInit} from '@angular/core';
import {StatisticsFilterSe} from '../../state/models/statistics-filter-se';
import {StatisticsFiltersFacadeService} from '../../state/facades/statistics-filters-facade.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'lib-external-internal-selector',
  templateUrl: './external-internal-selector.component.html',
  styleUrls: ['./external-internal-selector.component.scss']
})
export class ExternalInternalSelectorComponent implements OnInit {

  constructor(private statisticsFiltersFacade: StatisticsFiltersFacadeService) {
  }

  private logger: HistorianService;

  values = Object.values(StatisticsFilterSe);
  form: FormGroup;
  filterControl: FormControl;
  meetingTypeOptions =
    [{ value: StatisticsFilterSe.Internal, text: "Internal Meetings Only" },
     { value: StatisticsFilterSe.External, text: "All Meetings" }];

  private filterControlValueChange = (filterString) => {
    this.logger.debug('value changed', filterString);
    this.statisticsFiltersFacade.setStatisticsFilter(StatisticsFilterSe[filterString]);
  };

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
