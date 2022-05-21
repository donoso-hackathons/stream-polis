import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DashboardPageRoutingModule
  ]
})
export class DashboardPageModule { }
