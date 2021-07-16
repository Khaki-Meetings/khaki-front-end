import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment/moment';

@Pipe({name: 'meetingStartDate'})
export class MeetingStartDatePipe implements PipeTransform {

  transform(value: Moment): string {
    return moment(value).format("L");
  }

}
