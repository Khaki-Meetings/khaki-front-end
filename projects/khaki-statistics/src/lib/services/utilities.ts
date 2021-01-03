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
}
