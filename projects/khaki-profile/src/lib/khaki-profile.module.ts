import { NgModule } from '@angular/core';
import { KhakiProfileComponent } from './khaki-profile.component';
import {KhakiProfileRoutingModule} from './khaki-profile-routing.module';

@NgModule({
  declarations: [KhakiProfileComponent],
  imports: [
    KhakiProfileRoutingModule
  ],
  exports: [KhakiProfileComponent]
})
export class KhakiProfileModule { }
