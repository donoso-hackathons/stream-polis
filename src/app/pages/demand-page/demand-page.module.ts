import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandPageRoutingModule } from './demand-page-routing.module';
import { DemandPageComponent } from './demand-page.component';


@NgModule({
  declarations: [
    DemandPageComponent
  ],
  imports: [
    CommonModule,
    DemandPageRoutingModule
  ]
})
export class DemandPageModule { }
