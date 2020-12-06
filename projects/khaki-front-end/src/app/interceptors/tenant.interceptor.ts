import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TenantKeyFacadeService} from '../state/facades/tenant-key-facade.service';
import {concatMap} from 'rxjs/operators';

@Injectable()
export class TenantInterceptor implements HttpInterceptor {

  constructor(private tenantKeyFacade: TenantKeyFacadeService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.tenantKeyFacade
      .tenantKey()
      .pipe(
        concatMap(
          tenantKey => {
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
