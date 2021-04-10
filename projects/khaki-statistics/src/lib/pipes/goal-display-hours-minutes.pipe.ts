import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'goalDisplayHoursMinutes'})
export class GoalDisplayHoursMinutesPipe implements PipeTransform {

  transform(desc: string, minValue: number, maxValue: number): string {

    const minDisplayValue = minValue === null ? 0 : minValue;
    const minHours = Math.trunc(minDisplayValue / 60 / 60);
    const minMinutes = Math.trunc(minDisplayValue / 60 % 60);
    const minDisplay = minHours.toString().padStart(2, "0") + ':' + minMinutes.toString().padStart(2, "0");

    const maxDisplayValue = maxValue === null ? 0 : maxValue;
    const maxHours = Math.trunc(maxDisplayValue / 60 / 60);
    const maxmaxutes = Math.trunc(maxDisplayValue / 60 % 60);
    const maxDisplay = maxHours.toString().padStart(2, "0") + ':' + maxmaxutes.toString().padStart(2, "0");

    if (minValue == maxValue) {
      return "" + minDisplay;
    }

    if (minValue == null) {
      return "Less than " + maxDisplay;
    }

    if (maxValue == null) {
      return "More than " + minDisplay;
    }

    return "Between " + minDisplay + " and " + maxDisplay;

  }

}
