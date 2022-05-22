import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DappBaseComponent, DappInjector, global_tokens } from 'angular-web3';
import { utils } from 'ethers';
import { MessageService } from 'primeng/api';
import { interval, takeUntil } from 'rxjs';
import { SuperFluidServiceService } from 'src/app/dapp-injector/services/super-fluid/super-fluid-service.service';
import { ILOAN_TRADE } from 'src/app/shared/models/models';

@Component({
  selector: 'trade-display',
  templateUrl: './trade-display.component.html',
  styleUrls: ['./trade-display.component.sass']
})
export class TradeDisplayComponent extends DappBaseComponent implements OnInit {
  utils = utils;
  superToken!: { name: string; id: number; image: string; token: string; superToken: string; };
  signerAddress: string | undefined;
  finish!: string;
  twoDec!: string;
  fourDec!: string;
  provider: boolean = false;
  constructor(dapp:DappInjector,
    private superfluidService:SuperFluidServiceService,
     private msg: MessageService,store:Store) {
     super(dapp, store)
    }
  @Input() trade!:ILOAN_TRADE

  ngOnInit(): void {
    this.superToken =  global_tokens.filter((fil) => fil.superToken.toLowerCase() == this.trade.superToken)[0];
 
    this.signerAddress = this.dapp.signerAddress?.toLocaleLowerCase()
    this.provider =  this.signerAddress == this.trade.loanProvider



    this.finish = (new Date((+this.trade.initTimestamp + +this.trade.duration )*1000)).toLocaleString()
    const source = interval(500);


    source
      .pipe(takeUntil(this.destroyHooks))
      .subscribe((val) => {

        const todayms = (new Date()).getTime()/1000
        const alreadydFlow = (todayms - this.trade.initTimestamp)

        this.prepareNumbers(+alreadydFlow* this.trade.flowRate);
      });
    }
  

  prepareNumbers(balance: number) {
    
    const balanceIndex = balance.toString().indexOf(".");



    const niceTwo = (balance / 10 ** 18).toFixed(2);
   
    this.twoDec = (niceTwo)
    
    const niceFour = (balance / 10 ** 18).toFixed(6);

    this.fourDec = niceFour.substring(niceFour.length - 4, niceFour.length);
  }

}
