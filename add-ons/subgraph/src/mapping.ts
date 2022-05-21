
import {LoanDemand,LoanOffer,LoanTraded} from '../generated/schema'
import {LoanDemandCreated, LoanOfferCreated, LoanTradeCreated} from '../generated/LendingMarketPlace/LendingMarketPlace'

export function handleLoanOfferCreated(event:LoanOfferCreated):void {
  let id = event.params.loanOffered.loanOfferId.toString();

  let loanOffer = new LoanOffer(id)

  

}

export function handleLoanDemandCreated(event:LoanDemandCreated):void {
  let id = event.params.loanDemand.loanDemandId.toString();

  let loanOffer = new LoanDemand(id)

  

}


export function handleLoanTradeCreated(event:LoanTradeCreated):void {
  let id = event.params.loanTraded.loanTradedId.toString();

  let loanOffer = new LoanTraded(id)

  

}





