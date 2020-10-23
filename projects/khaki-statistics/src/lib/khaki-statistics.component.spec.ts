import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhakiStatisticsComponent } from './khaki-statistics.component';

describe('KhakiStatisticsComponent', () => {
  let component: KhakiStatisticsComponent;
  let fixture: ComponentFixture<KhakiStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhakiStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
