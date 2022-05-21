import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferDisplayComponent } from './offer-display/offer-display.component';



@NgModule({
  declarations: [
    OfferDisplayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OfferDisplayComponent
  ]
})
export class OfferDisplayModule { }
