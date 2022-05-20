//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

import {ISuperfluid, ISuperAgreement, ISuperToken, ISuperApp, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

import {DataTypes} from "./libraries/DataTypes.sol";
import {Events} from "./libraries/Events.sol";

import {ILoanFactory} from "./interfaces/ILoanFactory.sol";

import "hardhat/console.sol";

contract LendingMarketPlace {
  using CFAv1Library for CFAv1Library.InitData;
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  uint16 MARKET_PLACE_FEE;

  // declare `_idaLib` of type InitData

  ISuperfluid immutable host; // host
  IConstantFlowAgreementV1 private cfa;
  //initialize cfaV1 variable
  using CFAv1Library for CFAv1Library.InitData;
  CFAv1Library.InitData internal _cfaLib;

  Counters.Counter public _loansOfferedCounter;
  mapping(uint256 => DataTypes.LoanOffer) _loansOfferedById;
  /// Loans offered by Provider will be queried thorugh Graph

  Counters.Counter public _loansDemandCounter;
  mapping(uint256 => DataTypes.LoanDemand) _loansDemandedById;
  /// Loans offered by Provider will be queried thorugh Graph

  Counters.Counter public _loansTradedCounter;
  mapping(uint256 => DataTypes.LoanTraded) public _loansTradedById;

  /// Loans offered by Provider will be queried thorugh Graph

  mapping(address => uint256) public _loanIdByTaker;

  address immutable loanFactory;

  constructor(
    address _loanFactory,
    ISuperfluid _host,
    uint16 _marketPlaceFee
  ) {
    loanFactory = _loanFactory;
    host = _host;
    MARKET_PLACE_FEE = _marketPlaceFee;
    //initialize InitData struct, and set equal to cfaV1
    cfa = IConstantFlowAgreementV1(
      address(
        _host.getAgreementClass(
          keccak256(
            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
          )
        )
      )
    );
    _cfaLib = CFAv1Library.InitData(_host,cfa);

    // _cfaLib = CFAv1Library.InitData(_host, cfa);
  }

  // ============= =============  Modifiers ============= ============= //
  // #region Modidiers

  // endregion

  // ============= =============  Public Functions ============= ============= //
  // #region Public Functions

  /**
   * @notice Allows anyone to crate a Loan Offering
   * @dev the calculation of the flowrate will happen in fronted / ui will ask about durations in days/momnths
   */
  function offerLoan(DataTypes.OfferConfig memory config) public {
    _loansOfferedCounter.increment();

    uint256 loanId = _loansOfferedCounter.current();

    DataTypes.LoanOffer memory _loan = DataTypes.LoanOffer({
      loanOfferId: loanId,
      config: config,
      loanProvider: msg.sender,
      status: DataTypes.OFFER_STATUS.LIVE
    });

    _loansOfferedById[loanId] = _loan;

    emit Events.LoanOfferCreated(_loan);
  }

  /**
   * @notice Allows anyone to crate a Loan Offering
   * @dev the calculation of the flowrate will happen in fronted / ui will ask about durations in days/momnths
   */
  function demandLoan(DataTypes.DemandConfig memory config) public {
    _loansDemandCounter.increment();

    uint256 loanId = _loansDemandCounter.current();

    DataTypes.LoanDemand memory _loan = DataTypes.LoanDemand({
      loanDemandId: loanId,
      config: config,
      loanTaker: msg.sender,
      status: DataTypes.OFFER_STATUS.LIVE
    });

    _loansDemandedById[loanId] = _loan;

    emit Events.LoanDemandCreated(_loan);
  }

  function acceptOffer(DataTypes.TradeConfig memory _config) public {
    address loanContractImpl = Clones.clone(loanFactory);

    DataTypes.LoanOffer memory offer = _loansOfferedById[_config.offerId];

    _loansTradedCounter.increment();
    uint256 loanId = _loansTradedCounter.current();

    uint256 totalLoanAmount = _config
      .loanAmount
      .mul(offer.config.fee)
      .mul(MARKET_PLACE_FEE)
      .div(1000 * 1000);

    int96 totalInflowRate = int96(
      int256(totalLoanAmount.div(_config.duration))
    );

    uint256 collateral = _config
      .loanAmount
      .mul(offer.config.collateralShare)
      .div(100);

    DataTypes.LoanTraded memory loan = DataTypes.LoanTraded({
      loanTradedId: loanId,
      fee: offer.config.fee,
      loanAmount: _config.loanAmount,
      loanTotalAmount: totalLoanAmount,
      collateral: collateral,
      collateralShare: offer.config.collateralShare,
      flowRate: totalInflowRate,
      initTimeStamp: block.timestamp,
      status: DataTypes.LOAN_STATUS.ACTIVE,
      loanTaker: msg.sender,
      loanProvider: offer.loanProvider,
      superToken: address(offer.config.superToken),
      loanContract: loanContractImpl
    });

    ILoanFactory(loanContractImpl).initialize(host, cfa, loan);

    bytes memory userData = abi.encode(loanId, msg.sender);

     _cfaLib.createFlow(loan.loanProvider, loan.superToken, totalInflowRate);

    _cfaLib.createFlowByOperator(loan.loanTaker, loan.loanProvider, loan.superToken, totalInflowRate, userData);



    emit Events.LoanTradeCreated(loan);

    //// event
    /// update state
  }

  function AcceptDemand() public {}

  // endregion
}
