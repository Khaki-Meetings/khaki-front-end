import { Component, OnInit } from '@angular/core';
import { HistorianService, Logging } from '@natr/historian';
import { TenantFacadeService } from '../../../app/state/facades/tenant-facade.service';
import { KhakiAdminService } from '../../khaki-admin.service';

@Logging
@Component({
  selector: 'lib-calendar-import',
  templateUrl: './calendar-import.component.html',
  styleUrls: ['./calendar-import.component.scss']
})
export class CalendarImportComponent implements OnInit {

  private logger: HistorianService;
  tenantMap: Map<string, string> = new Map<string, string>();
  tenantKey: string;
  orgName: string;
  adminEmail: string;

  constructor(
    private tenantFacade: TenantFacadeService,
    private khakiAdminService: KhakiAdminService
  ) { }

  ngOnInit(): void {

    this.tenantFacade.tenantKey()
      .subscribe(val => this.tenantKey = val);

    this.khakiAdminService.getOrganization().subscribe(value =>
      {
        this.orgName = value.name;
        this.adminEmail = value.adminEmail;
        console.log("Current org: " + value.name + " " + value.adminEmail);
      });

  }

  import(): void {
    this.logger.debug("Tenant: " + this.tenantKey);
    this.khakiAdminService.importCalendar(this.tenantKey, this.adminEmail).subscribe();
  }
}
