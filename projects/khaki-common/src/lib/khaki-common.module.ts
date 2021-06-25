import { NgModule } from '@angular/core';
import { KhakiSpinnerComponent } from '../lib/components/khaki-spinner/khaki-spinner.component';
import { KhakiCommonComponent } from './khaki-common.component';



@NgModule({
  declarations: [
    KhakiCommonComponent,
    KhakiSpinnerComponent
  ],
  imports: [
  ],
  exports: [
    KhakiCommonComponent,
    KhakiSpinnerComponent
  ]
})
export class KhakiCommonModule { }
