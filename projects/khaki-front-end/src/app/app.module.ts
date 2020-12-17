import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './state/reducers';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SideNavComponent} from './components/side-nav/side-nav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthHttpInterceptor, AuthModule} from '@auth0/auth0-angular';
import {MainComponent} from './components/main/main.component';
import {environment} from '../environments/environment';
import {UserMetadataComponent} from './components/user-metadata/user-metadata.component';
import {TenantInterceptor} from './interceptors/tenant.interceptor';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    MainComponent,
    UserMetadataComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([]),
    AuthModule.forRoot(
      {
        domain: 'khaki.us.auth0.com',
        clientId: 'IsExX1nvgnEIcUWVvIqi7OD9uiscsChz',
        useRefreshTokens: true,
        cacheLocation: 'localstorage',
        audience: 'https://khaki.us.auth0.com/api/v2/',
        scope: 'read:current_user openid admin',
        httpInterceptor: {
          allowedList: [
            {
              uri: 'https://khaki.us.auth0.com/api/v2/*',
              tokenOptions: {
                audience: 'https://khaki.us.auth0.com/api/v2/',
                scope: 'read:current_user openid admin'
              }
            },
            {
              uri: `${environment.khakiBff}/*`,
              tokenOptions: {
                audience: 'https://khaki.us.auth0.com/api/v2/',
                scope: 'read:current_user openid admin'
              }
            }
          ]
        }
      }
    ),
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    {provide: 'environment', useValue: environment},
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TenantInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
