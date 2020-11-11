import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeIntervalFormComponent } from './time-interval-form.component';

describe('TimeIntervalFormComponent', () => {
  let component: TimeIntervalFormComponent;
  let fixture: ComponentFixture<TimeIntervalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeIntervalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeIntervalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
