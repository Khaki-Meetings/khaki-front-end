export class Utilities {
  static formatHrsMins(seconds: number): string {

    var hours = Math.trunc(seconds / 60 / 60);
    var minutes = Math.trunc(seconds / 60 % 60);

    var hoursLabel = 'hrs';
    if (hours == 1) {
      hoursLabel = 'hr';
    }

    var minutesLabel = 'mins';

    return hours + ' ' + hoursLabel + ', ' + minutes + ' ' + minutesLabel;
  }
}
