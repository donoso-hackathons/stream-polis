import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferDisplayComponent } from './offer-display/offer-display.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';



@NgModule({
  declarations: [
    OfferDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    DialogModule
  ],
  exports: [
    OfferDisplayComponent
  ]
})
export class OfferDisplayModule { }
