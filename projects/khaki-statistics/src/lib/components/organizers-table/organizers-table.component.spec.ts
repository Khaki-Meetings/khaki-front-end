import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizersTableComponent } from './organizers-table.component';
import {By} from "@angular/platform-browser";
import {MatTable} from "@angular/material/table";
import {SpinnerFacadeService} from "../../state/facades/spinner-facade.service";
import {OrganizersStatisticsFacadeService} from "../../state/facades/organizers-statistics-facade.service";

describe('OrganizersTableComponent', () => {
  let component: OrganizersTableComponent;
  let fixture: ComponentFixture<OrganizersTableComponent>;
  let mockOranizersStatisticsService: Partial<OrganizersStatisticsFacadeService>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizersTableComponent ],
      imports: [],
      providers: [
        {provide: OrganizersStatisticsFacadeService, useValue: mockOranizersStatisticsService}

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
