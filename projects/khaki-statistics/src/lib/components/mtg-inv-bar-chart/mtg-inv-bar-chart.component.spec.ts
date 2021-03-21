import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtgInvBarChartComponent } from './mtg-inv-bar-chart.component';

describe('MtgInvBarChartComponent', () => {
  let component: MtgInvBarChartComponent;
  let fixture: ComponentFixture<MtgInvBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtgInvBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtgInvBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
