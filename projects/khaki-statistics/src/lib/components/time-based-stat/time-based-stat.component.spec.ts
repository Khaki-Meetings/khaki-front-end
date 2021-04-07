import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBasedStatComponent } from './time-based-stat.component';

describe('TimeBasedStatComponent', () => {
  let component: TimeBasedStatComponent;
  let fixture: ComponentFixture<TimeBasedStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeBasedStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBasedStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
