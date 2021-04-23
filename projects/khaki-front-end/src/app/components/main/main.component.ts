import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import { GoogleAnalyticsService } from '../../google-analytics.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public authService: AuthService,
    public googleAnalyticsService: GoogleAnalyticsService) {
  }

  ngOnInit(): void {
  }

  login(): void {
      this.googleAnalyticsService
        .eventEmitter("login", "engagement", "login");

    this.authService.loginWithRedirect({connection: 'google-oauth2'});
  }
}
