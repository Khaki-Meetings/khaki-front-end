import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BaseIntervalComponent} from './base-interval.component';

describe('BaseIntervalComponent', () => {
  let component: BaseIntervalComponent;
  let fixture: ComponentFixture<BaseIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseIntervalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
