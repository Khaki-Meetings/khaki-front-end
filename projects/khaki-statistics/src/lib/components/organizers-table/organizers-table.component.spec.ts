import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizersTableComponent } from './organizers-table.component';
import {By} from "@angular/platform-browser";
import {MatTable} from "@angular/material/table";
import {SpinnerService} from "../../state/facades/spinner.service";
import {OranizersStatisticsService} from "../../state/facades/oranizers-statistics.service";

describe('OrganizersTableComponent', () => {
  let component: OrganizersTableComponent;
  let fixture: ComponentFixture<OrganizersTableComponent>;
  let mockOranizersStatisticsService: Partial<OranizersStatisticsService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizersTableComponent ],
      imports: [],
      providers: [
        {provide: OranizersStatisticsService, useValue: mockOranizersStatisticsService}

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should contain mat table',
    () => {
      const matTableElement = fixture.debugElement.query(By.directive(MatTable));
      expect(matTableElement).toBeTruthy('Mat Table required on this page');
    }
  );
});
