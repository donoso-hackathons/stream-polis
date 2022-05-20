import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandPageComponent } from './demand-page.component';

const routes: Routes = [{ path: '', component: DemandPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandPageRoutingModule { }
