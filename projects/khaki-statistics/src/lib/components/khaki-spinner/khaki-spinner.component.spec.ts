import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhakiSpinnerComponent } from './khaki-spinner.component';

describe('KhakiSpinnerComponent', () => {
  let component: KhakiSpinnerComponent;
  let fixture: ComponentFixture<KhakiSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhakiSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
