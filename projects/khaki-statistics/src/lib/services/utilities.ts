export class Utilities {
  static formatHrsMins(seconds: number): string {

    const hours = Math.trunc(seconds / 60 / 60);
    const minutes = Math.trunc(seconds / 60 % 60);

    let hoursLabel = 'hrs';
    if (hours === 1) {
      hoursLabel = 'hr';
    }

    const minutesLabel = 'mins';

    return hours + ' ' + hoursLabel + ', ' + minutes + ' ' + minutesLabel;
  }

  static calculateTimeBlock(interval: IntervalEnum, subtractIntervals: number = 0): TimeBlockRange {
    const now = moment();
    let timeBlock: StartOf;
    switch (interval) {
      case IntervalEnum.Day:
        timeBlock = 'day';
        break;
      case IntervalEnum.Week:
        timeBlock = 'week';
        break;
      case IntervalEnum.Month:
        timeBlock = 'month';
        break;
      case IntervalEnum.Year:
        timeBlock = 'year';
        break;
    }

    return {
      start: now.clone().utc().startOf('day').subtract(subtractIntervals, timeBlock),
      end: now.clone().utc().startOf('day')
    };
  }
}
