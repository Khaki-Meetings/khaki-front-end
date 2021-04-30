import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HistorianService, Logging} from '@natr/historian';
import { tap } from 'rxjs/operators';
import { DepartmentsFacadeService } from '../../state/facades/departments-facade.service';
import {StatisticsFiltersFacade} from '../../state/statistics-filters/statistics-filters-facade';

@Logging
@Component({
  selector: 'lib-department-selector',
  templateUrl: './department-selector.component.html',
  styleUrls: ['./department-selector.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DepartmentSelectorComponent implements OnInit {
  constructor(private statisticsFiltersFacade: StatisticsFiltersFacade,
  private departmentsFacade: DepartmentsFacadeService) {
  }

  private logger: HistorianService;

  form: FormGroup;
  departmentFilterControl: FormControl;
  departmentOptions = [];

  ngOnInit(): void {
    this.departmentOptions =
      [
        {name: "", value: ""}
      ];

    this.departmentFilterControl = new FormControl();
    this.form = new FormGroup(
      {
        filter: this.departmentFilterControl
      }
    );

    this.statisticsFiltersFacade.selectDepartment()
      .subscribe(
        department => {
          console.log('setting department from state', department); // was natr-historian  this.logger.debug
          this.departmentFilterControl.patchValue(department);
        }
      );


    this.departmentsFacade.dispatchDepartmentsList();

    this.departmentsFacade.selectDepartmentsList()
      .pipe(tap(map => this.logger.debug(map)))
      .subscribe(departmentMap => {
        let tmp = [
          { value: "", name: "All Departments" }
        ];
        departmentMap.content.forEach( function(value, key) {
          tmp.push( { value: value.name, name: value.name } );
        })
        this.departmentOptions = tmp;

        console.log('departmentOptions', this.departmentOptions);
      });

      this.departmentFilterControl.valueChanges
      .pipe(tap(map => console.log("departmentFilterControl.valueChanges")))
      .subscribe(newValue => {
        console.log("departmentFilterControl.valueChanges", newValue);
        this.statisticsFiltersFacade.dispatchSetDepartment(newValue);
      });

    this.departmentFilterControl.setValue( "" );
  }
}
