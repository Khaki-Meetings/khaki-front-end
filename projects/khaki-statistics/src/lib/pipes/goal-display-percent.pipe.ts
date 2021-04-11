import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'goalDisplayPercent'})
export class GoalDisplayPercentPipe implements PipeTransform {

  transform(desc: string, minValue: number, maxValue: number): string {

    if (minValue == maxValue) {
      return "" + minValue + "%";
    }

    if (minValue == null) {
      return "Less than " + maxValue + "%";
    }

    if (maxValue == null) {
      return "More than " + minValue + "%";
    }

    return "Between " + minValue + "% and " + maxValue + "%";
  }

}
