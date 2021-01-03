import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalInternalSelectorComponent } from './external-internal-selector.component';

describe('ExternalInternalSelectorComponent', () => {
  let component: ExternalInternalSelectorComponent;
  let fixture: ComponentFixture<ExternalInternalSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalInternalSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalInternalSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
