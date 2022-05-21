

export function handleLoanOfferCreated(event:LoanOfferCreated):void {
  let id = event.params.loanOfferId.toString();

  let loanOffer = new LoanOffer(id)

  

}

export function handleLoanDemandCreated(event:LoanOfferCreated):void {
  let id = event.params.loanDemandId.toString();

  let loanOffer = new LoanDemand(id)

  

}


export function handleLoanTradeCreated(event:LoanOfferCreated):void {
  let id = event.params.loanTradedId.toString();

  let loanOffer = new LoanTrade(id)

  

}





