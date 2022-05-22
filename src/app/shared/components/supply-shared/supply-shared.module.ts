import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplySharedComponent } from './supply-shared/supply-shared.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { OfferDisplayModule } from '../offer-display/offer-display.module';



@NgModule({
  declarations: [
    SupplySharedComponent
  ],
  imports: [
    CommonModule,
    TabViewModule,ButtonModule,
    OfferDisplayModule
  ],
  exports: [
    SupplySharedComponent
  ]
})
export class SupplySharedModule { }
