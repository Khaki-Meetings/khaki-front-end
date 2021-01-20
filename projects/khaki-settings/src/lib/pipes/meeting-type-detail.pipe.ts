import {Pipe, PipeTransform} from '@angular/core';
import {StatisticsScopeSe} from '../state/statistics-filters/statistics-scope-se.enum';

@Pipe({
  name: 'meetingTypeDetail'
})
export class MeetingTypeDetailPipe implements PipeTransform {

  transform(statisticsFilterSe: StatisticsScopeSe): string {
    if (statisticsFilterSe === StatisticsScopeSe.Internal) {
      return 'Internal Meetings Only';
    }
    return 'All Meetings';
  }
}
