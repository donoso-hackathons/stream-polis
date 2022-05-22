import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DappBaseComponent, DappInjector, global_tokens } from 'angular-web3';
import { utils } from 'ethers';
import { MessageService } from 'primeng/api';
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
  constructor(dapp:DappInjector,
    private superfluidService:SuperFluidServiceService,
     private msg: MessageService,store:Store) {
     super(dapp, store)
    }
  @Input() trade!:ILOAN_TRADE

  ngOnInit(): void {
    this.superToken =  global_tokens.filter((fil) => fil.superToken.toLowerCase() == this.trade.superToken)[0];
    console.log(this.trade)
    this.signerAddress = this.dapp.signerAddress?.toLocaleLowerCase()
    console.log((this.trade.initTimestamp+this.trade.duration))

    this.finish = (new Date((+this.trade.initTimestamp + this.trade.duration)*1000)).toLocaleString()
 
  }

}
