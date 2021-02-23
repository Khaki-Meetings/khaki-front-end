import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'hoursMinutes'})
export class HoursMinutesPipe implements PipeTransform {

  transform(value: number): string {
    const displayValue = value === null ? 0 : value;
    const hours = Math.trunc(displayValue / 60 / 60);
    const minutes = Math.trunc(displayValue / 60 % 60);

    const hoursLabel = hours === 1 ? 'hr' : 'hrs';

    const minutesLabel = 'mins';

    return hours + ' ' + hoursLabel + ', ' + minutes + ' ' + minutesLabel;
  }

}
