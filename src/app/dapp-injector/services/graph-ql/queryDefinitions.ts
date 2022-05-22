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


  export const GET_SUMMARY = `
    {
      totalSummaries(first: 5) {
        id
        totalIncoming
        totalBorrowed
      }
    }
  `;
  export const GET_USER = `
  query($address: String!){
      user(id:$address) {
        offersCreated {
          loanMaxAmount
          loanMinAmount
          fee
          collateralShare
          id
          maxDuration
          superToken
          loanProvider {
            id
          }
        }
        loansSold {
          id
          loanTotalAmount
          loanAmount
          collateral
          initTimestamp
          flowRate
          status
          collateralShare
          fee
          loanTaker {id}
          loanProvider { id }
          duration
          superToken
        }
        loansBought {
          id
          loanTotalAmount
          loanAmount
          collateral
          initTimestamp
          flowRate
          status
          collateralShare
          fee
          loanTaker {id}
          loanProvider { id }
          duration
          superToken
        }
      }
    }
  `;