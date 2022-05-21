import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateOfferRoutingModule } from './create-offer-routing.module';
import { CreateOfferComponent } from './create-offer.component';


@NgModule({
  declarations: [
    CreateOfferComponent
  ],
  imports: [
    CommonModule,
    CreateOfferRoutingModule
  ]
})
export class CreateOfferModule { }
