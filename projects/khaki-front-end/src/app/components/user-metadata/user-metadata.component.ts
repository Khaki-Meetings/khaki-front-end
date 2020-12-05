import {Component, OnInit} from '@angular/core';
import {concatMap, pluck, tap} from 'rxjs/operators';

// Import the HttpClient for making API requests
import {HttpClient} from '@angular/common/http';

// Import AuthService from the Auth0 Angular SDK to get access to the user
import {AuthService} from '@auth0/auth0-angular';
import {HistorianService, Logging} from '@natr/historian';
import {StatisticsService} from '../../../../../khaki-statistics/src/lib/services/statistics.service';
import {IntervalEnum} from '../../../../../khaki-statistics/src/lib/services/models/interval.enum';

@Logging
@Component({
  selector: 'app-metadata',
  template: `
    <div *ngIf="metadata">
      <pre>{{ metadata | json }}</pre>
    </div>`,
  styles: [],
})
export class UserMetadataComponent implements OnInit {
  metadata = {};
  logger: HistorianService;

  // Inject both AuthService and HttpClient
  constructor(public auth: AuthService, private http: HttpClient, private statsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.auth.user$
      .pipe(
        concatMap((user) =>
          // Use HttpClient to make the call
          this.http.get(
            encodeURI(`https://khaki.us.auth0.com/api/v2/users/${user.sub}`)
          )
        ),
        pluck('user_metadata'),
        tap((meta) => (this.metadata = meta))
      )
      .subscribe();

    this.stats();
  }

  stats(): void {
    this.statsService
      .getOrganizersStatistics(IntervalEnum.Year)
      .subscribe(
        data => {
          this.logger.debug('organizer data', data);
        }
      );
  }
}
