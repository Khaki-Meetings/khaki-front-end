import {Injectable} from '@angular/core';
import {KhakiState, setTenantKeyAction, setTenantMapAction} from '../reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantFacadeService {

  constructor(private store: Store<KhakiState>) {
  }

  public tenantKey(): Observable<string> {
    return this.store.select(store => store.tenantKey);
  }

  public setTenantKey(tenantKey: string): void {
    localStorage.setItem('tenantKey', tenantKey);
    this.store.dispatch(setTenantKeyAction({tenantKey}));
  }

  public tenantMap(): Observable<Map<string, string>> {
    return this.store.select(store => store.tenantMap);
  }

  public setTenantMap(tenantMap: Map<string, string>): void {
    this.store.dispatch(setTenantMapAction({tenantMap}));
  }
}
