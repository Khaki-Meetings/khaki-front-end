import { Component, OnInit } from '@angular/core';
import {UserProfileFacadeService} from '../../state/facades/user-profile-facade.service';
import {HistorianService, Logging} from '@natr/historian';

@Logging
@Component({
  selector: 'lib-settings-main',
  templateUrl: './settings-main.component.html',
  styleUrls: ['./settings-main.component.scss']
})
export class SettingsMainComponent implements OnInit {
  private logger: HistorianService;

  constructor(private profileFacadeService: UserProfileFacadeService) { }

  ngOnInit(): void {
    this.profileFacadeService.requestUserProfile();
  }

}
