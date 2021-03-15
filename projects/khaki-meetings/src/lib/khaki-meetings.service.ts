import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEventsResponseDto } from './services/models/calendarEventsResponseDto'
import { HistorianService, Logging } from '@natr/historian';

@Logging
@Injectable({
  providedIn: 'root'
})

export class KhakiMeetingsService {
  logger: HistorianService;

  constructor(private httpClient: HttpClient, @Inject('environment') private environment) { }

  private getCalendarEventsUrl(count: number = 25, page: number = 0): string {
    let url = '/assets/calendarEventsData.json?count=${count}&page=${page}';
    if (this.environment.khakiBff) {
      url = '${this.environment.khakiBff}?count=${count}&page=${page}';
    }
    this.logger.debug('url is', url);
    return url;
  }

  loadCalendarEvents(count: number = 25, page: number = 0): Observable<CalendarEventsResponseDto> {
    const url = this.getCalendarEventsUrl(count, page);
    return this.httpClient
      .get(url)
      .pipe(
        map(
          (data: CalendarEventsResponseDto) => data as CalendarEventsResponseDto
        ),
      );
  }

}
