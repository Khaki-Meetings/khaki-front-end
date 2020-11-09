import { NgModule } from '@angular/core';
import { KhakiInfoComponent } from './khaki-info.component';
import {KhakiInfoRoutingModule} from './khaki-info-routing.module';



@NgModule({
  declarations: [KhakiInfoComponent],
  imports: [
    KhakiInfoRoutingModule
  ],
  exports: [KhakiInfoComponent]
})
export class KhakiInfoModule { }
