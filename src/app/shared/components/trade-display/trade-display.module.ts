import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeDisplayComponent } from './trade-display/trade-display.component';



@NgModule({
  declarations: [
    TradeDisplayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TradeDisplayComponent
  ]
})
export class TradeDisplayModule { }
