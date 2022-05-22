import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { OfferDisplayModule } from 'src/app/shared/components/offer-display/offer-display.module';
import { TradeDisplayModule } from 'src/app/shared/components/trade-display/trade-display.module';

@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    DashboardPageRoutingModule,

    OfferDisplayModule,
    TradeDisplayModule,
    ButtonModule,
    TabViewModule
    
  ]
})
export class DashboardPageModule { }
