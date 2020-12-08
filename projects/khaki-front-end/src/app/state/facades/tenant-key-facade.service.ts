import {Injectable} from '@angular/core';
import {KhakiState, setTenantKeyAction} from '../reducers';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenantKeyFacadeService {

  constructor(private store: Store<KhakiState>) {
  }

  public tenantKey(): Observable<string> {
    return this.store.select(store => store.tenantKey);
  }

  public setTenantKey(tenantKey: string): void {
    this.store.dispatch(setTenantKeyAction({tenantKey}));
  }
}
