import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamUploadComponent } from './team-upload.component';

describe('TeamUploadComponent', () => {
  let component: TeamUploadComponent;
  let fixture: ComponentFixture<TeamUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
