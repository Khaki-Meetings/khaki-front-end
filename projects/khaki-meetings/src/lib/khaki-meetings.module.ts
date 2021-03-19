import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { KhakiMeetingsComponent } from './khaki-meetings.component';
import { KhakiMeetingsRoutingModule } from './khaki-meetings-routing.module';
import { MeetingsListComponent } from './components/meetings-list/meetings-list.component';
import { MeetingsEffects } from './state/effects/meetings.effects';
import { EffectsModule } from '@ngrx/effects';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'  
import * as fromCalendarEventResponse from './state';

@NgModule({
  declarations: [
    KhakiMeetingsComponent,
    MeetingsListComponent
  ],
  imports: [
    KhakiMeetingsRoutingModule,
    CommonModule,
    StoreModule.forFeature(
      fromCalendarEventResponse.khakiMeetingsFeatureKey,
      fromCalendarEventResponse.reducers,
      {
        metaReducers: fromCalendarEventResponse.metaReducers
      }
    ),
    EffectsModule.forFeature(
      [
        MeetingsEffects,
      ]
    ),
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [KhakiMeetingsComponent]
})
export class KhakiMeetingsModule { }
