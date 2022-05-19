// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.0;

/**
 * @title DataTypes
 * @author donoso_eth
 *
 * @notice A standard library of data types used throughout.
 */
library DataTypes {
    struct LoanOffer {
        uint loanOfferId;
        uint256 loanAmount;
        address superToken;
        uint256 collateralShare;
        int96 flowRate;
        address loanProvider;
        OFFER_STATUS status;
    }

    struct LoanTraded {
        uint256 loanTradedId;
        uint256 loanOfferId;
        uint256 initTimeStamp;
        int96 flowRate;
        uint256 collateralShare;
        uint256 loanAmount;
        LOAN_STATUS status;
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
