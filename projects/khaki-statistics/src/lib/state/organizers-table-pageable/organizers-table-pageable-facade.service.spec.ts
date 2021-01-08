import { TestBed } from '@angular/core/testing';

import { OrganizersTablePageableFacade } from './organizers-table-pageable-facade.service';

describe('OrganizersTablePageableFacadeService', () => {
  let service: OrganizersTablePageableFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizersTablePageableFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
