import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard-page/dashboard-page.module').then(
        (m) => m.DashboardPageModule
      ),
  },
  {
    path: 'supply',
    loadChildren: () =>
      import('./pages/supply-page/supply-page.module').then(
        (m) => m.SupplyPageModule
      ),
  },
  { path: 'demand', loadChildren: () => import('./pages/demand-page/demand-page.module').then(m => m.DemandPageModule) },
  { path: 'create-offer', loadChildren: () => import('./pages/create-offer/create-offer.module').then(m => m.CreateOfferModule) },
  { path: 'create-demand', loadChildren: () => import('./pages/create-demand/create-demand.module').then(m => m.CreateDemandModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
