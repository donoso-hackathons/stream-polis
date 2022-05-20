import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplyPageRoutingModule } from './supply-page-routing.module';
import { SupplyPageComponent } from './supply-page.component';


@NgModule({
  declarations: [
    SupplyPageComponent
  ],
  imports: [
    CommonModule,
    SupplyPageRoutingModule
  ]
})
export class SupplyPageModule { }
