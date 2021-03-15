import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarEventDto, CalendarEventsResponseDto } from '../../services/models/calendarEventsResponseDto'
import { KhakiMeetingsService } from '../../khaki-meetings.service'
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CalendarEventsFacadeService } from '../../state/facades/calendarevents-facade.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'lib-meetings-list',
  templateUrl: './meetings-list.component.html',
  styleUrls: ['./meetings-list.component.scss']
})

export class MeetingsListComponent implements OnInit {

  dataSource: CalendarEventDto[] = [];
  displayedColumns: string[] = ['meetingDate','meetingTime','title','attendees'];
  pageSizeOptions: number[] = [5, 25, 50, 100];
  defaultPageSize: number = 25;
  defaultPageIndex: number = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private meetingsService: KhakiMeetingsService,
      private calendarEventsFacadeService: CalendarEventsFacadeService) {
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('paginator is', this.paginator);
      this.calendarEventsFacadeService.calendarEvents(this.defaultPageSize, this.defaultPageIndex)
        .subscribe(calendarEventsResponse => {
          console.log('onInit calendarEventsResponseDto', calendarEventsResponse);
          this.dataSource = calendarEventsResponse.calendarEvents;
          this.paginator.length = calendarEventsResponse.totalElements;
          this.paginator.pageSize = calendarEventsResponse.size;
        }
      );
    })
  }

  pageChange(event: PageEvent): void {
    console.log('page change event', event);
    this.calendarEventsFacadeService.calendarEvents(event.pageSize, event.pageIndex)
      .subscribe(calendarEventsResponse => {
        console.log('onInit calendarEventsResponseDto', calendarEventsResponse);
        this.dataSource = calendarEventsResponse.calendarEvents;
        this.paginator.length = calendarEventsResponse.totalElements;
        this.paginator.pageSize = calendarEventsResponse.size;
      }
    );
  }

}
