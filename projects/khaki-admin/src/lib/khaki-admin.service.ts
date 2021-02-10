import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}
