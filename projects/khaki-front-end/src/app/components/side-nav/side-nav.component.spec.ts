import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SideNavComponent} from './side-nav.component';
import {AuthModule} from '@auth0/auth0-angular';
import {provideMockStore} from '@ngrx/store/testing';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavComponent],
      imports: [AuthModule.forRoot({clientId: '', domain: ''})],
      providers: [provideMockStore()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
