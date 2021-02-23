import {Component, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {HistorianService, Logging} from '@natr/historian';
import {TenantFacadeService} from './state/facades/tenant-facade.service';
import {StatisticsFiltersFacade as SettingsModuleStatisticsFiltersFacade} from 'khaki-settings';
import {StatisticsFiltersFacade as StatisticsModuleStatisticsFiltersFacade} from 'khaki-statistics';
import {KhakiState} from './state/reducers';
import {Store} from '@ngrx/store';
import {statisticsFiltersAttributeKey} from './state/statistics-filters/statistics-filters.reducer';
import {take} from 'rxjs/operators';

@Logging
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'khaki-front-end';
  show = false;
  isAuthed = false;

  private logger: HistorianService;

  constructor(
    private authService: AuthService,
    private tenantFacade: TenantFacadeService,
    private settingsModuleStatisticsFiltersFacade: SettingsModuleStatisticsFiltersFacade,
    private statisticsModuleStatisticsFiltersFacade: StatisticsModuleStatisticsFiltersFacade,
    private store: Store<KhakiState>
  ) {
  }

  toggleDrawerShow(): void {
    this.show = !this.show;
  }

  onNavigateBtn(): void {
    this.show = false;
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(authed => this.isAuthed = authed);
    this.setChildrenStatisticsFiltersInitialState();
    this.authService.idTokenClaims$
      .subscribe(
        claims => {
          this.logger.debug('claims', claims);
          const tenantIds: object = claims['https://getkhaki.com/tenantIds'];
          if (typeof tenantIds === 'object') {
            this.logger.debug('tenantId', tenantIds);
            const keys = Object.keys(tenantIds);
            if (keys.length > 0) {
              this.logger.debug('tenantIds keys', keys);
              // this.tenantFacade.setTenantKey(keys[0]);
              const map = new Map<string, string>(Object.entries(tenantIds));
              this.tenantFacade.setTenantMap(map);
            }
          }
        }
      );
    this.authService.getAccessTokenSilently()
      .subscribe(
        accessToken => this.logger.debug('secret thing', accessToken)
      );
    this.authService.user$.subscribe(user => {
      this.logger.debug('authed user', user);
    });
  }

  openHelpDialog(): void {
    document.getElementById('helpModal').style.display = 'block';
  }

  closeHelpDialog(): void {
    document.getElementById('helpModal').style.display = 'none';
  }

  setChildrenStatisticsFiltersInitialState(): void{
    this.store.select(state => state[statisticsFiltersAttributeKey])
      .subscribe(
        statisticsFilters => {
          this.logger.debug('statisticsFilters', statisticsFilters);
          this.settingsModuleStatisticsFiltersFacade.dispatchSetStatisticsFilters(statisticsFilters);
          this.statisticsModuleStatisticsFiltersFacade.dispatchSetStatisticsFilters(statisticsFilters);
        }
      );
  }
}
