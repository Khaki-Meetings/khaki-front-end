import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhakiSettingsComponent } from './khaki-settings.component';

describe('KhakiSettingsComponent', () => {
  let component: KhakiSettingsComponent;
  let fixture: ComponentFixture<KhakiSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhakiSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
