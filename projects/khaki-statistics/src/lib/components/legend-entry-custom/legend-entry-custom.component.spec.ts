import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendEntryCustomComponent } from './legend-entry-custom.component';

describe('LegendEntryCustomComponent', () => {
  let component: LegendEntryCustomComponent;
  let fixture: ComponentFixture<LegendEntryCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegendEntryCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendEntryCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
