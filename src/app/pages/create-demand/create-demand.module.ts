import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateDemandRoutingModule } from './create-demand-routing.module';
import { CreateDemandComponent } from './create-demand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [
    CreateDemandComponent
  ],
  imports: [
    CommonModule,
    CreateDemandRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule,
    DialogModule
  ]
})
export class CreateDemandModule { }
