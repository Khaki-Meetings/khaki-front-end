import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {AuthModule, AuthService} from '@auth0/auth0-angular';
import {provideMockStore} from '@ngrx/store/testing';
import {TenantFacadeService} from './state/facades/tenant-facade.service';
import {Observable, of} from 'rxjs';

describe('AppComponent', () => {
  let tenantFacade: Partial<TenantFacadeService>;

  beforeEach(async () => {
    tenantFacade = {
      tenantMap(): Observable<Map<string, string>> {
        return of(new Map<string, string>([['foo', 'bar']]));
      }
    };
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AuthModule.forRoot({clientId: '', domain: ''})
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'khaki-front-end'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('khaki-front-end');
  });
});
