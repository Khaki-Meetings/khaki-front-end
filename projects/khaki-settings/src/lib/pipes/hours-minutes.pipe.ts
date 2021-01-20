import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'hoursMinutes'})
export class HoursMinutesPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === 0) {
      return '(empty)';
    }
    const hours = Math.trunc(value / 60 / 60);
    const minutes = Math.trunc(value / 60 % 60);

    const hoursLabel = hours === 1 ? 'hr' : 'hrs';

    const minutesLabel = 'mins';

    return hours + ' ' + hoursLabel + ', ' + minutes + ' ' + minutesLabel;
  }

}
