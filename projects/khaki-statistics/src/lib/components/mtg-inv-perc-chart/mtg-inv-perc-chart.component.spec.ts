import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtgInvPercChartComponent } from './mtg-inv-perc-chart.component';

describe('MtgInvPercChartComponent', () => {
  let component: MtgInvPercChartComponent;
  let fixture: ComponentFixture<MtgInvPercChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtgInvPercChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtgInvPercChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
