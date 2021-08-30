import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Injectable({providedIn: 'root'})
export class KhakiAdminService {

  constructor(private httpClient: HttpClient, @Inject('environment') private environment) {
  }

  // noinspection JSUnusedLocalSymbols
  private logger: HistorianService;

  saveOrganization(organizationInfo: { name: string, adminEmail: string }): Observable<any> {
    const url = `${this.environment.khakiBff}/organizations`;
    this.logger.debug('url is', url);
    return this.httpClient.post(url, organizationInfo);
  }

  getOrganization(): Observable<any> {
    const url = `${this.environment.khakiBff}/organizations`;
    this.logger.debug('url is', url);
    return this.httpClient.get(url);
  }

  importCalendar(tenantKey: string, adminEmail: string): Observable<any> {
    this.logger.debug("Import calendar for " + tenantKey + " " + adminEmail);
    try {
      const url = `${this.environment.khakiBff}/calendar-imports/` + adminEmail;
      const headers = new HttpHeaders()
        .set('KHAKI-TENANT', tenantKey);
    return this.httpClient.post(url, { 'headers': headers });
  } catch (error) {
    this.logger.debug(error);
  }
  return null;
  }
}
