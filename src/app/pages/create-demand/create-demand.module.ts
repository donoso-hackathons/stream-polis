import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateDemandRoutingModule } from './create-demand-routing.module';
import { CreateDemandComponent } from './create-demand.component';


@NgModule({
  declarations: [
    CreateDemandComponent
  ],
  imports: [
    CommonModule,
    CreateDemandRoutingModule
  ]
})
export class CreateDemandModule { }
