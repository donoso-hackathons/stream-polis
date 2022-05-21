import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DappBaseComponent, DappInjector } from 'angular-web3';
import { GraphQlService } from 'src/app/dapp-injector/services/graph-ql/graph-ql.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent extends DappBaseComponent{

  constructor(private router: Router, store: Store, dapp: DappInjector, private graphqlService:GraphQlService) {
    super(dapp, store);
  }

 async  connect() {

  //this.dapp.localWallet(1)

  this.dapp.launchWebModal()

   // this.router.navigate(['home'])
    
  }



  override async hookContractConnected(): Promise<void> {
    // this.pcrOptimisticOracleContract = this.dapp.DAPP_STATE.pcrOptimisticOracleContract!;
  
    // console.log(this.pcrOptimisticOracleContract)

    // this.pcrOptimisticOracleContract.instance.on('RewardDeposit',(args1,args2)=> {
    //     console.log(args1, args2)
    // })
    this.router.navigate(['home'])

  }
}
