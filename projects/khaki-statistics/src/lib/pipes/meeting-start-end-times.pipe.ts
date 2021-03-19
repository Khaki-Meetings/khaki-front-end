import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment/moment';

@Pipe({name: 'meetingStartEndTimes'})
export class MeetingStartEndTimesPipe implements PipeTransform {

  transform(value: any, start: Moment, end: Moment): string {

    var startTime = moment(start).format("h:mm");

    if ((moment(start).hour() < 12) && (moment(end).hour() >= 12)) {
      startTime = startTime + 'am';
    }

    var endTime = moment(end).format("h:mma");

    return startTime + "-" + endTime;
  }

}
