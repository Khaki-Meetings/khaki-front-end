import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwelveMonthTrailingGraphComponent } from './twelve-month-trailing-graph.component';

describe('TwelveMonthTrailingGraphComponent', () => {
  let component: TwelveMonthTrailingGraphComponent;
  let fixture: ComponentFixture<TwelveMonthTrailingGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwelveMonthTrailingGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwelveMonthTrailingGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
