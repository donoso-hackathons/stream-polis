import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplyPageComponent } from './supply-page.component';

const routes: Routes = [{ path: '', component: SupplyPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyPageRoutingModule { }
