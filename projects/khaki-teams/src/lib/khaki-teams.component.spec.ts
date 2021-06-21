import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhakiTeamsComponent } from './khaki-teams.component';

describe('KhakiTeamsComponent', () => {
  let component: KhakiTeamsComponent;
  let fixture: ComponentFixture<KhakiTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhakiTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
