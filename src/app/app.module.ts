import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DappInjectorModule } from './dapp-injector/dapp-injector.module';
import { StoreModule } from '@ngrx/store';
import { ICONTRACT_METADATA, we3ReducerFunction } from 'angular-web3';
import { AppFooterComponent } from './shared/components/footer/app.footer.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { AppTopBarComponent } from './shared/components/toolbar/app.topbar.component';

import { GraphQlModule } from './dapp-injector/services/graph-ql/graph-ql.module';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

import LendingMarketplaceMetadata from '../assets/contracts/lending_market_place_metadata.json';
export const contractMetadata = new InjectionToken<ICONTRACT_METADATA>('contractMetadata')

export const contractProvider= {provide: 'contractMetadata', useValue:LendingMarketplaceMetadata};

const network = 'localhost';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,

    AppTopBarComponent,
    AppFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DappInjectorModule.forRoot({wallet:'local', defaultNetwork:network}),
    StoreModule.forRoot({web3: we3ReducerFunction}),
    GraphQlModule.forRoot({uri: ''}),

    DropdownModule,
    ProgressSpinnerModule,
    ToastModule,
    ButtonModule
  ],
  providers: [contractProvider, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
