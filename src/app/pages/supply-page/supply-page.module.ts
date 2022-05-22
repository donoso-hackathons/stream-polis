import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplyPageRoutingModule } from './supply-page-routing.module';
import { SupplyPageComponent } from './supply-page.component';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { OfferDisplayModule } from 'src/app/shared/components/offer-display/offer-display.module';
import { SupplySharedModule } from 'src/app/shared/components/supply-shared/supply-shared.module';


@NgModule({
  declarations: [
    SupplyPageComponent
  ],
  imports: [
    CommonModule,
    SupplyPageRoutingModule,

    SupplySharedModule

  ]
})
export class SupplyPageModule { }
