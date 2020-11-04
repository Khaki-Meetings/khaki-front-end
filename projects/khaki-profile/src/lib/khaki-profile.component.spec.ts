import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhakiProfileComponent } from './khaki-profile.component';

describe('KhakiProfileComponent', () => {
  let component: KhakiProfileComponent;
  let fixture: ComponentFixture<KhakiProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhakiProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
