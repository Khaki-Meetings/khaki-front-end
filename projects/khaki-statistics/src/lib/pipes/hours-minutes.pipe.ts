import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'hoursMinutes'})
export class HoursMinutesPipe implements PipeTransform {

  transform(value: number): string {
    const displayValue = value === null || Number.isNaN(value) ? 0 : value;
    
    const hours = Math.trunc(displayValue / 60 / 60);
    const minutes = Math.trunc(displayValue / 60 % 60);

    // SOURCE FOR XX HRS, YY MINS
    // const hoursLabel = hours === 1 ? 'hr' : 'hrs';
    // const minutesLabel = 'mins';
    // return hours + ' ' + hoursLabel + ', ' + minutes + ' ' + minutesLabel;

    if (hours > 1000) {
      return hours.toString();
    };

    return hours.toString().padStart(2, "0") + ':' + minutes.toString().padStart(2, "0");

  }

}
