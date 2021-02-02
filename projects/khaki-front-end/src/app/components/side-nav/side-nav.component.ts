import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {TenantFacadeService} from '../../state/facades/tenant-facade.service';
import {tap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';
import {DOCUMENT} from '@angular/common';

@Logging
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  private static readonly TenantKey = 'tenantKey';
  private logger: HistorianService;
  isAuthed = false;
  hasMultiTenant = false;
  defaultTenant: string;
  userImgUrl: string;
  userDisplayName: string;
  userEmail: string;

  tenantMap: Map<string, string> = new Map<string, string>();

  constructor(private authService: AuthService, private tenantFacade: TenantFacadeService, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(authed => this.isAuthed = authed);
    this.tenantFacade.tenantMap().pipe(tap(map => this.logger.debug(map))).subscribe(tenantMap => this.tenants(tenantMap));
    this.authService.user$.subscribe(
      user => {
        this.userDisplayName = user.name;
        this.userEmail = user.email;
        this.userImgUrl = user.picture
      });
  }

  logout(): void {
    const returnTo = `${this.document.location.origin}`;
    this.authService.logout({returnTo});
  }

  onTenantChange(event): void {
    this.tenantFacade.setTenantKey(event.value);
  }

  private tenants(tenantMap: Map<string, string>): void {
    if (!tenantMap || tenantMap.size < 1) {
      return;
    }
    const storedKey = localStorage.getItem(SideNavComponent.TenantKey);
    this.defaultTenant = storedKey ? storedKey : tenantMap.keys().next().value;
    this.tenantFacade.setTenantKey(this.defaultTenant);

    if (tenantMap.size > 1) {
      this.logger.debug('tenantMap', tenantMap);
      this.hasMultiTenant = true;
      this.tenantMap = tenantMap;
    }
  }

  openHelpDialog(): void {
    document.getElementById('helpModal').style.display = 'block';
  }

  closeHelpDialog(): void {
    document.getElementById('helpModal').style.display = 'none';
  }

}
