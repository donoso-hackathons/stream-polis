import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeDisplayComponent } from './trade-display/trade-display.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [
    TradeDisplayComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputNumberModule
  ],
  exports: [
    TradeDisplayComponent
  ]
})
export class TradeDisplayModule { }
