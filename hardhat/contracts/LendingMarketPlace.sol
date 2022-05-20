//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

import {ISuperfluid, ISuperAgreement, ISuperToken, ISuperApp, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

import {DataTypes} from "./libraries/DataTypes.sol";
import {Events} from "./libraries/Events.sol";

import {ILoanFactory} from "./interfaces/ILoanFactory.sol";



import "hardhat/console.sol";

contract LendingMarketPlace {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  
  ISuperfluid  immutable host; // host
  IConstantFlowAgreementV1 immutable cfa; // the stored constant flow agreement class address


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

  constructor(address _loanFactory,ISuperfluid _host, IConstantFlowAgreementV1 _cfa) {
    loanFactory = _loanFactory;
    host = _host;
    cfa = _cfa;
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

  function acceptOffer() public {

    address loanContractImpl = Clones.clone(loanFactory);


  _loansTradedCounter.increment();
  uint loadId = _loansTradedCounter.current();


      DataTypes.LoanTraded memory loan = DataTypes.LoanTraded({
      loanTradedId: loanId,
      fee:20,
      loanAmount: 2000,
      collateralShare: loan.collateralShare,
      flowRate: _localState.inFlowRate,
      initTimeStamp: block.timestamp,
      status: DataTypes.LOAN_STATUS.ACTIVE,
      loanTaker:  _localState.loanTaker,
      loanProvider:  _localState.loanTaker,
      superToken: address(_localState.superToken)
    });

    ILoanFactory(loanContractImpl).initialize(host,cfa,loan);




    /// clone loan factory
    /// initialize factory
    /// start stream to new loan contract
    // cfa.createFlowByOperator(token, sender, receiver, flowRate,""0x);

    //// event
    /// update state
  }

  function AcceptDemand() public {}

  // endregion
}
