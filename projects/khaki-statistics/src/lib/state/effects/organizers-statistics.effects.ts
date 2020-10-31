import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';


@Injectable()
export class OrganizersStatisticsEffects {

  organizersStatisticsEffect$;

  constructor(private actions$: Actions) {
  }

}
