import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  DappBaseComponent,
  DappInjector,
  Web3Actions,
} from 'angular-web3';
import { utils } from 'ethers';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';

import { GraphQlService } from 'src/app/dapp-injector/services/graph-ql/graph-ql.service';
import { ILOAN_OFFER, ILOAN_TRADE} from 'src/app/shared/models/models';

export enum REWARD_STEP {
  QUALIFYING,
  AWAITING_PROPOSAL,
  LIVENESS_PERIOD,
  AWAITING_EXECUTION,
}
@Component({
  selector: 'dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.sass'],
})
export class DashboardPageComponent
  extends DappBaseComponent
  implements OnInit
{
  loanOffers: Array<any> = [];
  loanDemand: Array<any> = [];
  loansSold: Array<any> = [];
  loanTrades: Array<ILOAN_TRADE> = [];
  utils = utils;

  activeStep = 0;
  constructor(
    private msg: MessageService,
    private router: Router,
    dapp: DappInjector,
    store: Store,
    private graphqlService: GraphQlService
  ) {
    super(dapp, store);
  }
  ngOnInit(): void {
    if (this.blockchain_status == 'wallet-connected') {
      this.getTokens();
    }
  }

  seeDetailsOffer(reward: ILOAN_OFFER) {
    this.router.navigateByUrl(`details-pcr/${reward.id}`);
  }

  goDetailsMembership(membership: any) {
    this.router.navigateByUrl(`details-membership/${membership.id}`);
  }

  transformOffer(offer: ILOAN_OFFER) {
    // reward.displayDate = new Date(+reward.earliestNextAction * 1000).toLocaleString()
    // const displayReward = global_tokens.filter((fil) => fil.superToken == reward.token)[0];
    // reward.fundToken = displayReward;
    // reward.displayStep = calculateStep(+reward.rewardStep,+reward.earliestNextAction);
    // return reward;
  }

  async getTokens() {
  
    this.loanOffers = [];
    this.loanDemand = [];
    this.loansSold = [];
    this.loanTrades = [];
    const users = this.graphqlService
      .queryUser(this.dapp.signerAddress!)
      .pipe(takeUntil(this.destroyHooks))
      .subscribe((val) => {
        console.log(val);
        if (!!val && !!val.data && !!val.data.user) {
          const user = val.data.user;
          const localOffers = user.offersCreated;
          if (localOffers !== undefined) {
            localOffers.forEach((each: any) => {
              const availableTokenIndex = this.loanOffers
                .map((fil) => fil.id)
                .indexOf(each.id);
              if (availableTokenIndex == -1) {
                let updated = {...each, ...{ loanProvider:each.loanProvider.id}}

                this.loanOffers.push(updated);
              } else {
                this.loanOffers[availableTokenIndex] = {
                  ...this.loanOffers[availableTokenIndex],
                  ...each,
                };
              }
            });
          } else {
            this.loanOffers = [];
          }

          const localTrades = user.loansSold.concat(user.loansBought);
          console.log(localTrades)
          if (localTrades !== undefined) {
            localTrades.forEach((each: any) => {
              const availableTokenIndex = this.loanTrades
                .map((fil) => fil.id)
                .indexOf(each.id);
              if (availableTokenIndex == -1) {
                let updated = {...each, ...{ loanTaker:each.loanTaker.id,  loanProvider:each.loanProvider.id}}

                this.loanTrades.push(updated);
              } else {
                this.loanTrades[availableTokenIndex] = {
                  ...this.loanTrades[availableTokenIndex],
                  ...each,
                  ...{ loanTaker:each.loanTaker.id,  loanProvider:each.loanProvider.id}
                };
              }
            });
          } else {
            this.loanTrades = [];
          }

        }
      });
     // console.log(JSON.stringify(this.loanOffers))
    this.store.dispatch(Web3Actions.chainBusy({ status: false }));
  }

  createOffer() {
    this.router.navigateByUrl('create-offer');
  }

  createDemand() {
    this.router.navigateByUrl('create-demand');
  }

  override async hookContractConnected(): Promise<void> {
    this.getTokens();
  }
}
