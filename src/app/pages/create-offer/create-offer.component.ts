import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { utils } from 'ethers';

import { createERC20Instance, DappBaseComponent, DappInjector,  global_address,  target_conditions,  Web3Actions } from 'angular-web3';

import { doSignerTransaction } from 'src/app/dapp-injector/classes/transactor';
import { Store } from '@ngrx/store';

import { MessageService } from 'primeng/api';
import { OfferConfigStruct } from 'src/assets/contracts/interfaces/LendingMarketPlace';

@Component({
  selector: 'create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.sass']
})
export class CreateOfferComponent extends DappBaseComponent {
  loanOfferForm: FormGroup;

  conditions = target_conditions;

  tokens = [
    {
      name: 'DAI',
      id: 0,
      image: 'dai',
      token: global_address.mumbai.fDai,
      superToken: global_address.mumbai.fDaix,
    },
    {
      name: 'USDC',
      id: 0,
      image: 'usdc',
      token: global_address.mumbai.fDai,
      superToken: global_address.mumbai.fDaix,
    },
    // { name: 'DAIx', id: 1, image: 'dai', token:global_address.mumbai.fDaix,superToken:global_address.mumbai.fDaix  },
    // { name: 'USDCx', id: 2, image: 'usdc' },
    // { name: 'USDC', id: 3, image: 'usdc' },
  ];
  /// intervals for pcr reward checking, factor interval in sec
  durations = [
    // { name: 'minutes', id: 0, factor: 60 },
    { name: 'hours', id: 1, factor: 3600 },
    { name: 'days', id: 2, factor: 86400 },
    { name: 'months', id: 3, factor: 2592000 },
  ];



  selectedToken!: { name: string; id: number; image: string };

  display = false;

  constructor(private msg: MessageService, public formBuilder: FormBuilder, private router: Router, dapp: DappInjector, store: Store) {
    super(dapp, store);
    this.selectedToken = this.tokens[0];

    this.loanOfferForm= this.formBuilder.group({
    

      tokenCtrl: [
        {
          name: 'DAI',
          id: 0,
          image: 'dai',
          token: global_address.mumbai.fDai,
          superToken: global_address.mumbai.fDaix,
        },
        Validators.required,
      ],

      loanMaxAmountCtrl: [10, [Validators.required, Validators.min(1)]],
      loanMinAmountCtrl: [10, [Validators.required, Validators.min(1)]],
      feeCtrl: [0, [Validators.required]],
      collateralShareCtrl: [0, [Validators.required]],
      durationCtrl: [ { name: 'hours', id: 1, factor: 3600 }, [Validators.required]],
      durationAmountCtrl: [25, [Validators.required, Validators.min(1)]],
      

     
    });
  }

  goDashboard() {
    this.display = false;
    this.router.navigateByUrl('dashboard');
  }

  async createLoanOffer() {
    // //

    let maxDuration = this.loanOfferForm.controls.durationAmountCtrl.value * this.loanOfferForm.controls.durationCtrl.value.factor;

    const offerConfig:OfferConfigStruct =  {
      loanMaxAmount: utils.parseEther(this.loanOfferForm.controls.loanMaxAmountCtrl.value.toString()),
      loanMinAmount: utils.parseEther(this.loanOfferForm.controls.loanMinAmountCtrl.value.toString()),
      fee:this.loanOfferForm.controls.feeCtrl.value*100,
      superToken: this.loanOfferForm.controls.tokenCtrl.value.superToken,
      collateralShare: this.loanOfferForm.controls.collateralShareCtrl.value*100,
      maxDuration

    }

       this.store.dispatch(Web3Actions.chainBusy({ status: true }));

       const resultApprove = await doSignerTransaction(createERC20Instance(  offerConfig.superToken, this.dapp.signer!)
       .approve( this.dapp.defaultContract?.address, offerConfig.loanMaxAmount ));


    const result = await doSignerTransaction(this.dapp.defaultContract?.instance.offerLoan(offerConfig)!);
    if (result.success == true) {
      this.msg.add({ key: 'tst', severity: 'success', summary: 'Great!', detail: `Your Offer has been created` });
 
      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
      this.router.navigate(['dashboard'])
    } else {
      this.msg.add({ key: 'tst', severity: 'error', summary: 'OOPS', detail: `Error creating your Loan Offer` });
      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
    }

    

  }

  back() {
    this.router.navigateByUrl('dashboard');
  }
}
