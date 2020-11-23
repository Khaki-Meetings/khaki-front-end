import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDepartmentComponent } from './settings-department.component';

describe('SettingsDepartmentComponent', () => {
  let component: SettingsDepartmentComponent;
  let fixture: ComponentFixture<SettingsDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
