import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhakiMeetingsComponent } from './khaki-meetings.component';

describe('KhakiMeetingsComponent', () => {
  let component: KhakiMeetingsComponent;
  let fixture: ComponentFixture<KhakiMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhakiMeetingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KhakiMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
