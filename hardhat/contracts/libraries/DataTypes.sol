// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.0;

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
    uint8 fee;
    address superToken;
    uint256 collateralShare;
    int96 flowRate;
  }

  struct LoanOffer {
    uint256 loanOfferId;
    OfferConfig config;
    address loanProvider;
    OFFER_STATUS status;
  }

  struct DemandConfig {
    uint256 loanAmount;
    uint8 fee;
    address superToken;
    uint256 collateralShare;
    int96 flowRate;
  }

  struct LoanDemand {
    uint256 loanDemandId;
    DemandConfig config;
    address loanTaker;
    OFFER_STATUS status;
  }


  struct LoanTraded {
    uint256 loanTradedId;
    uint8 fee;
    uint256 initTimeStamp;
    int96 flowRate;
    address superToken;
    uint256 collateralShare;
    uint256 loanAmount;
    LOAN_STATUS status;
    address loanTaker;
    address loanProvider;
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
