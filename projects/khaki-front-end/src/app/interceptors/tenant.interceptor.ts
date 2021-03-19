import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TenantFacadeService} from '../state/facades/tenant-facade.service';
import {concatMap} from 'rxjs/operators';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Injectable()
export class TenantInterceptor implements HttpInterceptor {
  private logger: HistorianService;

  constructor(private tenantKeyFacade: TenantFacadeService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.tenantKeyFacade
      .tenantKey()
      .pipe(
        concatMap(
          tenantKey => {
            console.log('tenantKey', tenantKey); // was natr-historian  this.logger.debug
            tenantKey = tenantKey || '';
            request = request.clone(
              {
                headers: request.headers.set('KHAKI-TENANT', tenantKey)
              }
            );
            return next.handle(request);
          }
        )
      );
  }
}
