import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DappBaseComponent, DappInjector, global_tokens, Web3Actions } from 'angular-web3';
import { utils } from 'ethers';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';

import { GraphQlService } from 'src/app/dapp-injector/services/graph-ql/graph-ql.service';
import { ILOAN_OFFER } from 'src/app/shared/models/models';




export enum REWARD_STEP {
  QUALIFYING,
  AWAITING_PROPOSAL,
  LIVENESS_PERIOD,
  AWAITING_EXECUTION,
}
@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass']
})
export class DashboardPageComponent extends DappBaseComponent implements OnInit {
  loanOffers: Array<any> = [];
  loanDemand:Array<any> = [];
  loansSold:Array<any> = [];
  loansBougth:Array<any> = [];
  utils = utils
 
  activeStep = 0;
   constructor(private msg: MessageService,private router: Router, dapp: DappInjector, store: Store, private graphqlService: GraphQlService) {
    super(dapp, store);



  }
  ngOnInit(): void {
    if (this.blockchain_status == 'wallet-connected'){
      this.getTokens()
    }
  }




  seeDetailsOffer(reward:ILOAN_OFFER){


   this.router.navigateByUrl(`details-pcr/${reward.id}`)
  }


  goDetailsMembership(membership:any){
    this.router.navigateByUrl(`details-membership/${membership.id}`)
  }

  transformOffer(offer:ILOAN_OFFER) {


    // reward.displayDate = new Date(+reward.earliestNextAction * 1000).toLocaleString()
    // const displayReward = global_tokens.filter((fil) => fil.superToken == reward.rewardToken)[0];
    // reward.fundToken = displayReward;
    // reward.displayStep = calculateStep(+reward.rewardStep,+reward.earliestNextAction);
    // return reward;
  }



  async getTokens() {

    this.loanOffers  = [];
    this.loanDemand= [];
    this.loansSold = [];
    this.loansBougth = [];
    const  users = this.graphqlService.queryUser(this.dapp.signerAddress!).pipe(takeUntil(this.destroyHooks)).subscribe((val=> {
   
      if (!!val && !!val.data && !!val.data.user) {
        const user = val.data.user;
        const localOffers= user.rewardsCreated;
        if (localOffers !== undefined) {
          localOffers.forEach((each: any) => {
            const availableTokenIndex = this.loanOffers.map((fil) => fil.id).indexOf(each.id);
            if (availableTokenIndex == -1) {
              this.loanOffers.push(this.transformOffer(each));
            } else {
              this.loanOffers[availableTokenIndex] = { ...this.loanOffers[availableTokenIndex], ...each};
            }
          });
        } else {
          this.loanOffers = [];
        }




       
      }
   
   

    }))
  

 

    this.store.dispatch(Web3Actions.chainBusy({ status: false }));
  }

  createPcr() {
    this.router.navigateByUrl('create-pcr');
  }



  override async hookContractConnected(): Promise<void> {

    this.getTokens();

  }
}
