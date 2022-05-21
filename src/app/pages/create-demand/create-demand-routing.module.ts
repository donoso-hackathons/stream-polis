import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDemandComponent } from './create-demand.component';

const routes: Routes = [{ path: '', component: CreateDemandComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateDemandRoutingModule { }
