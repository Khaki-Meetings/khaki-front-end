import { Component, OnInit } from '@angular/core';
import { CalendarEventsFacadeService } from './state/facades/calendarevents-facade.service'
@Component({
  selector: 'lib-khaki-meetings',
  templateUrl: './khaki-meetings.component.html',
  styleUrls: ['./khaki-meetings.component.scss']
})

export class KhakiMeetingsComponent implements OnInit {

  constructor(private facadeService: CalendarEventsFacadeService) { }

  ngOnInit(): void {
    this.facadeService.requestCalendarEvents(25, 0);
  }

}
