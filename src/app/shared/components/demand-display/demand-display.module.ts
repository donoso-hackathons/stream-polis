import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandDisplayComponent } from './demand-display.component';



@NgModule({
  declarations: [DemandDisplayComponent],
  imports: [
    CommonModule
  ],
  exports:[DemandDisplayComponent]
})
export class DemandDisplayModule { }
