import { TestBed } from '@angular/core/testing';

import { OrganizersTablePageableFacade } from './organizers-table-pageable-facade.service';
import {provideMockStore} from '@ngrx/store/testing';

describe('OrganizersTablePageableFacadeService', () => {
  let service: OrganizersTablePageableFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [provideMockStore()]});
    service = TestBed.inject(OrganizersTablePageableFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
