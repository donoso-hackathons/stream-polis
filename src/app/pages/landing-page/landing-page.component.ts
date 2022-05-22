import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DappBaseComponent, DappInjector } from 'angular-web3';
import { utils } from 'ethers';
import { GraphQlService } from 'src/app/dapp-injector/services/graph-ql/graph-ql.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent extends DappBaseComponent{
  borrowed!: string;
  flowRate!: any;

  constructor(private router: Router, store: Store, dapp: DappInjector, private graphqlService:GraphQlService) {
    super(dapp, store);

    this.querySummary()

  }

async querySummary(){
 const data = await this.graphqlService.querySummary()
firea
 const summary = data.data.totalSummaries[0];

this.borrowed = utils.formatEther(summary.totalBorrowed)
  this.flowRate = utils.formatEther(summary.totalIncoming)
}

 async  connect() {

  //this.dapp.localWallet(1)

  this.dapp.launchWebModal()

   // this.router.navigate(['dashboard'])
    
  }




}
