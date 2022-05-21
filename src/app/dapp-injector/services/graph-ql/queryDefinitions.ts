export const GET_OFFERS = `
    {
      loanOffers(first: 5) {
        id
  loanMaxAmount
  loanMinAmount
  fee
  superToken
  collateralShare
  maxDuration
  loanProvider {
    id
  }
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

  export const GET_USER = `
  query($address: String!){
      user(id:$address) {
        offersCreated {
          loanMaxAmount
          id
        }
      }
    }
  `;