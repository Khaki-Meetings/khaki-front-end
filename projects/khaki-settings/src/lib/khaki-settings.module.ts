import { NgModule } from '@angular/core';
import { KhakiSettingsComponent } from './khaki-settings.component';
import {KhakiSettingsRoutingModule} from './khaki-settings-routing.module';



@NgModule({
  declarations: [KhakiSettingsComponent],
  imports: [
    KhakiSettingsRoutingModule
  ],
  exports: [KhakiSettingsComponent]
})
export class KhakiSettingsModule { }
