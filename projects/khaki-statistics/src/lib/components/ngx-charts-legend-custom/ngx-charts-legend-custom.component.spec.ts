import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartsLegendCustomComponent } from './ngx-charts-legend-custom.component';

describe('NgxChartsLegendCustomComponent', () => {
  let component: NgxChartsLegendCustomComponent;
  let fixture: ComponentFixture<NgxChartsLegendCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxChartsLegendCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartsLegendCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
