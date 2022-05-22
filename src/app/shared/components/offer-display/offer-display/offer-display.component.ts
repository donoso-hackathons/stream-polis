import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createERC20Instance, DappBaseComponent, DappInjector, global_tokens, Web3Actions } from 'angular-web3';
import { utils } from 'ethers';
import { MessageService } from 'primeng/api';
import { doSignerTransaction } from 'src/app/dapp-injector/classes/transactor';
import { SuperFluidServiceService } from 'src/app/dapp-injector/services/super-fluid/super-fluid-service.service';
import { ILOAN_OFFER } from 'src/app/shared/models/models';
import { TradeConfigStruct } from 'src/assets/contracts/interfaces/LendingMarketPlace';

@Component({
  selector: 'offer-display',
  templateUrl: './offer-display.component.html',
  styleUrls: ['./offer-display.component.scss']
})
export class OfferDisplayComponent extends DappBaseComponent implements OnInit {

  utils = utils;
  superToken!: { name: string; id: number; image: string; token: string; superToken: string; };
  signerAddress: string | undefined;
  showAcceptOfferState = false;
  loanAmountCtrl = new FormControl(0, Validators.required);
  constructor(dapp:DappInjector,
   private superfluidService:SuperFluidServiceService,
    private msg: MessageService,store:Store) {
    super(dapp, store)
   }

  @Input() offer!:ILOAN_OFFER
  @Output() acceptOfferEvent = new EventEmitter()

 async  acceptOffer(){

  this.showAcceptOfferState = false;

  this.store.dispatch(Web3Actions.chainBusy({ status: true }));


    let tradeConfig:TradeConfigStruct = {
      offerId: this.offer.id,
      loanAmount:utils.parseEther(this.loanAmountCtrl.value.toString()),
      duration: this.offer.maxDuration
    }

    const getMaths = await this.dapp.defaultContract?.instance.getMaths(
      tradeConfig.loanAmount,
      this.offer.fee,
      tradeConfig.duration,
      this.offer.collateralShare
    );
  
      console.log(getMaths)
     
      const resultApprove = await doSignerTransaction(createERC20Instance(this.offer.superToken, this.dapp.signer!)
      .approve(this.dapp.defaultContract?.address,getMaths!.collateral.toString() ));
 
      if (resultApprove.success == true) {
      } else {
        this.store.dispatch(Web3Actions.chainBusy({ status: false }));
        this.msg.add({ key: 'tst', severity: 'error', summary: 'OOPS', detail: `Error Approving Amount with txHash:` });
        return;
      }

     await  this.superfluidService.approveOperator(this.offer.superToken,1,getMaths!.totalInflowRate.toString())



    const result = await doSignerTransaction(
      this.dapp.defaultContract?.instance.acceptOffer(tradeConfig)!
    );
    if (result.success == true) {
      this.msg.add({
        key: 'tst',
        severity: 'success',
        summary: 'Great!',
        detail: `Your Loan Has been Generated`,
      });

      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
    } else {
      this.msg.add({
        key: 'tst',
        severity: 'error',
        summary: 'OOPS',
        detail: `Error Accepting your loan`,
      });
      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
    }

  }

  showAcceptOffer() {
    if(this.dapp.signerAddress == null|| this.dapp.signerAddress == undefined) {
      this.msg.add({ key: 'tst', severity: 'error', summary: 'OOPS', detail: `Please connect your wallet` });
      return
      }
      this.showAcceptOfferState = true;
  //  this.acceptOfferEvent.emit()

  }

  ngOnInit(): void {
    this.superToken =  global_tokens.filter((fil) => fil.superToken.toLowerCase() == this.offer.superToken)[0];
    console.log(this.offer)
    this.signerAddress = this.dapp.signerAddress?.toLocaleLowerCase()
  }

}
