import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeBasedStatDialogComponent } from './time-based-stat-dialog.component';

describe('TimeBasedStatDialogComponent', () => {
  let component: TimeBasedStatDialogComponent;
  let fixture: ComponentFixture<TimeBasedStatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeBasedStatDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeBasedStatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
