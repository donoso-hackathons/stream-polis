import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DappBaseComponent, DappInjector, Web3Actions } from 'angular-web3';
import { MessageService } from 'primeng/api';
import { GraphQlService } from 'src/app/dapp-injector/services/graph-ql/graph-ql.service';
import { ILOAN_OFFER } from 'src/app/shared/models/models';

@Component({
  selector: 'supply-shared',
  templateUrl: './supply-shared.component.html',
  styleUrls: ['./supply-shared.component.scss']
})
export class SupplySharedComponent extends DappBaseComponent implements OnInit {
  loanOffers!:ILOAN_OFFER[];
  loanDemand!:ILOAN_OFFER[];

  showAcceptOfferState = false;

  constructor(private graphqlService: GraphQlService, dapp: DappInjector,store:Store,private msg: MessageService, ) { 
    super(dapp,store)
  }

  acceptOffer() {
    if(this.dapp.signerAddress == null|| this.dapp.signerAddress == undefined) {
    this.msg.add({ key: 'tst', severity: 'error', summary: 'OOPS', detail: `Please connect your wallet` });
    return
    }
    this.showAcceptOfferState = true;
   // this.msg.add({ key: 'tst', severity: 'success', summary: 'Great!', detail: `Please connect your wallet` });
  }

  async getOffers() {

    this.loanOffers = [];
    this.loanDemand = [];

    const val =  await this.graphqlService
      .queryOffers()

        console.log(val);
        if (!!val && !!val.data && !!val.data.loanOffers) {
          const user = val.data.user;
          const localOffers = val.data.loanOffers;
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
        }
 
      console.log(JSON.stringify(this.loanOffers))
    this.store.dispatch(Web3Actions.chainBusy({ status: false }));
  }

  ngOnInit(): void {
    this.getOffers();
  }

}
