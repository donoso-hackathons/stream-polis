// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.0;


import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperToken.sol";

/**
 * @title DataTypes
 * @author donoso_eth
 *
 * @notice A standard library of data types used throughout.
 */
library DataTypes {

  struct OfferConfig {
    uint256 loanMaxAmount;
    uint256 loanMinAmount;
    uint16 fee;
    address superToken;
    uint16 collateralShare;
    uint256 maxDuration;
  }

  struct LoanOffer {
    uint256 loanOfferId;
    OfferConfig config;
    address loanProvider;
    OFFER_STATUS status;
  }

  struct DemandConfig {
    uint256 loanAmount;
    uint16 fee;
    address superToken;
    uint256 collateralShare;
    int96 duration;
  }

  struct LoanDemand {
    uint256 loanDemandId;
    DemandConfig config;
    address loanTaker;
    OFFER_STATUS status;
  }

struct TradeConfig {
    uint offerId;
    uint loanAmount;
    uint duration;
}


  struct LoanTraded {
    uint256 loanTradedId;
    uint16 fee;
    uint256 loanAmount;
    uint256 loanTotalAmount;
     uint256 collateral;
    uint16 collateralShare;
     int96 flowRate;
    uint256 initTimestamp;
    LOAN_STATUS status;    
    address loanTaker;
    address loanProvider;
    ISuperToken superToken;
    address loanContract;

  }

  struct K {
    uint256 value;
    uint256 timestamp;
    uint256 flowRate1;
    uint256 flowRate2;
  }

  /////////// Enums

  enum LOAN_STATUS {
    ACTIVE,
    PAYED,
    LIQUIDATED
  }

  enum OFFER_STATUS {
    LIVE,
    PAUSED
  }
}
