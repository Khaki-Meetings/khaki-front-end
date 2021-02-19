import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhakiAdminComponent } from './khaki-admin.component';

describe('KhakiAdminComponent', () => {
  let component: KhakiAdminComponent;
  let fixture: ComponentFixture<KhakiAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhakiAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
