import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {OrganizerStatisticsSm} from '../../../state/models/organizer-statistics-sm';
import {Observable} from 'rxjs';

export class OrganizersStatisticsDataSource extends DataSource<OrganizerStatisticsSm> {
  connect(collectionViewer: CollectionViewer): Observable<ReadonlyArray<OrganizerStatisticsSm>> {
    return undefined;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }
}
