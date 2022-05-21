import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { utils } from 'ethers';

import { DappBaseComponent, DappInjector,  global_address,  target_conditions,  Web3Actions } from 'angular-web3';

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

  rewardTypes = [
    { Condition: 'KPI with Yes/No Answer?', code: 'YES_OR_NO_QUERY', id: 0 },
    { Condition: 'KPI with Numeric Target', code: 'YES_OR_NO_QUERY', id: 1 },
  ];

  tokens = [
    {
      name: 'DAI',
      id: 0,
      image: 'dai',
      rewardToken: global_address.mumbai.fDai,
      superToken: global_address.mumbai.fDaix,
    },
    {
      name: 'USDC',
      id: 0,
      image: 'usd',
      rewardToken: global_address.mumbai.fDai,
      superToken: global_address.mumbai.fDaix,
    },
    // { name: 'DAIx', id: 1, image: 'dai', rewardToken:global_address.mumbai.fDaix,superToken:global_address.mumbai.fDaix  },
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
          rewardToken: global_address.mumbai.fDai,
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

  async createPcr() {
    // //

    let maxDuration = this.loanOfferForm.controls.durationAmountCtrl.value * this.loanOfferForm.controls.durationCtrl.value.factor;

    const offerConfig:OfferConfigStruct =  {
      loanMaxAmount:this.loanOfferForm.controls.loanMaxAmountCtrl.value,
      loanMinAmount: this.loanOfferForm.controls.loanMinAmountCtrl.value,
      fee:this.loanOfferForm.controls.feeCtrl.value,
      superToken: this.loanOfferForm.controls.tokenCtrl.value.superToken,
      collateralShare: this.loanOfferForm.controls.collateralShareCtrl.value,
      maxDuration

    }

       this.store.dispatch(Web3Actions.chainBusy({ status: true }));

    const result = await doSignerTransaction(this.dapp.defaultContract?.instance.offerLoan(offerConfig)!);
    if (result.success == true) {
      this.msg.add({ key: 'tst', severity: 'success', summary: 'Great!', detail: `Your Offer has been created` });
 
      this.store.dispatch(Web3Actions.chainBusy({ status: false }));

    } else {
      this.msg.add({ key: 'tst', severity: 'error', summary: 'OOPS', detail: `Error creating your Loan Offer` });
      this.store.dispatch(Web3Actions.chainBusy({ status: false }));
    }

    


    // const titleValue = this.loanOfferForm.controls.titleCtrl.value;
    // const descriptionValue = this.loanOfferForm.controls.questionCtrl.value;
    // const urlValue = this.loanOfferForm.controls.urlCtrl.value;
    // const customAncillaryData = utils.hexlify(
    //   utils.toUtf8Bytes(`q: title: ${titleValue}?, description: ${descriptionValue}, url:${urlValue} . res_data: p1: 0, p2: 1, p3: 0.5. Where p2 corresponds to Yes, p1 to a No, p3 to unknown`)
    // );

    // const title = utils.hexlify(utils.toUtf8Bytes(titleValue));

    // const description = utils.hexlify(utils.toUtf8Bytes(descriptionValue));

    // const url = utils.hexlify(utils.toUtf8Bytes(urlValue));

    // const rewardConfig: PCRHOSTCONFIGINPUTStruct = {
    //   title,
    //   description,
    //   url,
    //   pcrTokenImpl: this.dapp.tokenImpl,
    //   pcrOptimisticOracleImpl: this.dapp.optimisticOracleImpl,
    // };

    // /// PriceIdentifier for ortimistic oracle
    // const priceIdentifier = utils.formatBytes32String('YES_OR_NO_QUERY');

    // let condition = this.loanOfferForm.controls.conditionTypeCtrl.value.id;
    // let priceType = 0;
    // let target;
    // if (this.loanOfferForm.controls.rewardTypeCtrl.value.id == 0) {
    //   target = utils.parseEther('1');
    //   condition = 2;
    // } else {
    //   target = utils.parseEther(this.loanOfferForm.controls.targetAmountCtrl.value.toString());
    //   priceType = 1;
    // }

    // const OptimisticOracle: OPTIMISTICORACLEINPUTStruct = {
    //   finder: global_address.mumbai.finder,
    //   rewardAmount: utils.parseEther(this.loanOfferForm.controls.loanMaxAmountCtrl.value.toString()),
    //   target: target,
    //   priceType,
    //   targetCondition: condition,
    //   interval: this.loanOfferForm.controls.intervalAmountCtrl.value * this.loanOfferForm.controls.intervalCtrl.value.factor,
    //   optimisticOracleLivenessTime: this.loanOfferForm.controls.loanMinAmountCtrl.value * this.loanOfferForm.controls.livenessCtrl.value.factor,
    //   customAncillaryData,
    //   priceIdentifier,
    // };

    // const Ida: IDAINPUTStruct = {
    //   host: global_address.mumbai.host,
    //   ida: global_address.mumbai.ida,
    //   rewardToken: this.loanOfferForm.controls.tokenCtrl.value.superToken,
    // };

    // this.store.dispatch(Web3Actions.chainBusy({ status: true }));

    // const result = await doSignerTransaction(this.dapp.pcrHostContract?.instance.createPcrReward(rewardConfig, Ida, OptimisticOracle)!);
    // if (result.success == true) {
    //   this.store.dispatch(Web3Actions.chainBusy({ status: false }));
    //   this.display = true;
    // } else {
    //   this.msg.add({ key: 'tst', severity: 'error', summary: 'OOPS', detail: `Error creating your PCR with txHash:${result.txHash}` });
    //   this.store.dispatch(Web3Actions.chainBusy({ status: false }));
    // }
  }

  back() {
    this.router.navigateByUrl('dashboard');
  }
}
