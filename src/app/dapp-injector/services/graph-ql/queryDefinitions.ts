export const GET_OFFERS = `
    {
      loanOffers(first: 5, where: {status:"0"}, orderBy: id, orderDirection: asc) {
        id
  loanMaxAmount
  loanMinAmount
  fee
  superToken: 
  collateralShare
  maxDuration
  loanProvider:
  status
   
      }
    }
  `;


  export const GET_DEMANDS = `
    {
      loanDemands(first: 5, where: {status:"0"}, orderBy: id, orderDirection: asc) {
        id
        loanAmount
        fee
        superToken
        collateralShare
        duration
        loanTaker
        status
   
      }
    }
  `;
