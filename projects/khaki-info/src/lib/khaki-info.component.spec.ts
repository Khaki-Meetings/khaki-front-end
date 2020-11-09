import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhakiInfoComponent } from './khaki-info.component';

describe('KhakiInfoComponent', () => {
  let component: KhakiInfoComponent;
  let fixture: ComponentFixture<KhakiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhakiInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
