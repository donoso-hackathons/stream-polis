//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";





import {ISuperfluid, ISuperAgreement, ISuperToken, ISuperApp, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

import {DataTypes} from "./libraries/DataTypes.sol";
import {Events} from "./libraries/Events.sol";

import {ILoanFactory} from "./interfaces/ILoanFactory.sol";



import "hardhat/console.sol";

contract LoanFactory is ILoanFactory, SuperAppBase, Initializable {
  using SafeMath for uint256;
  using Counters for Counters.Counter;

  ISuperfluid public host; // host
  IConstantFlowAgreementV1 public cfa; // the stored constant flow agreement class address

  DataTypes.LoanTraded loan;

  /// Loans offered by Provider will be queried thorugh Graph


  mapping(address => uint) public _loanIdByTaker;


  constructor() {
    
    host = ISuperfluid(0xEB796bdb90fFA0f28255275e16936D25d3418603);
        cfa = IConstantFlowAgreementV1(
      address(
        host.getAgreementClass(
          keccak256(
            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
          )
        )
      )
    );
    uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL |
      SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
      SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
      SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;
 

    host.registerApp(configWord);

 
  

  }

 /**
   * @notice initializer of the contract/oracle
   */
  function initialize(DataTypes.LoanTraded memory _loan) external override initializer {
  
  
    loan = _loan;



  }


  // ============= =============  Modifiers ============= ============= //
  // #region Modidiers

  modifier onlyHost() {
    require(msg.sender == address(host), "RedirectAll: support only one host");
    _;
  }

  modifier onlyExpected(address agreementClass) {
    require(_isCFAv1(agreementClass), "RedirectAll: only CFAv1 supported");
    _;
  }

  // endregion



  /**************************************************************************
   * SuperApp callbacks
   *************************************************************************/

  struct LocalStateCallBack {
    bytes newCtx;
    ISuperfluid.Context decodedContext;
    uint256 loanOfferId;
    uint256 loanDuration;
    address loanTaker;
    int96 inFlowRate;
    ISuperToken superToken;
  }

  function afterAgreementCreated(
    ISuperToken _superToken,
    address _agreementClass,
    bytes32, // _agreementId,
    bytes calldata _agreementData,
    bytes calldata, // _cbdata,
    bytes calldata _ctx
  )
    external
    override
    onlyExpected(_agreementClass)
    onlyHost
    returns (bytes memory newCtx)
  {
    console.log('juay kuay');

    LocalStateCallBack memory _localState = LocalStateCallBack({
      newCtx: _ctx,
      decodedContext: host.decodeCtx(_ctx),
      loanOfferId: 0,
      loanDuration: 0,
      loanTaker: address(0),
      inFlowRate: 0,
      superToken: _superToken
    });

    (_localState.loanOfferId, _localState.loanTaker) = parseLoanData(
      _localState.decodedContext.userData
    );


    require(loan.loanProvider != address(0), "NOT_EXISTING_LOAN");
    require(
      ISuperToken(loan.superToken) == _superToken,
      "SUPERTOKEN_NOT_MATCH"
    );

    (address marketplace, ) = abi.decode(_agreementData, (address, address));

    require(
       _loanIdByTaker[_localState.loanTaker] == 0,
      "ONLY_ONE_LOAN_PER_USER"
    );

    _loanIdByTaker[_localState.loanTaker] = loan.loanTradedId;

    // use case ony one loan per user



    (, _localState.inFlowRate, , ) = cfa.getFlow(
      _localState.superToken,
      marketplace,
      address(this)
    );


    ///Create FLOW To loanProvider
    (_localState.newCtx, ) = host.callAgreementWithContext(
      cfa,
      abi.encodeWithSelector(
        cfa.createFlow.selector,
        _localState.superToken,
        loan.loanProvider,
        _localState.inFlowRate,
        new bytes(0) // placeholder
      ),
      "0x",
      _localState.newCtx
    );





   // emit Events.LoanTradeCreated();

    //registerGelato and set call back find stream

    return _localState.newCtx;
  }

  function afterAgreementTerminated(
    ISuperToken, /*superToken*/
    address, /*agreementClass*/
    bytes32, // _agreementId,
    bytes calldata _agreementData,
    bytes calldata, /*cbdata*/
    bytes calldata _ctx
  ) external virtual override returns (bytes memory newCtx) {

    console.log('juppy juppy finish');
     try  this.parseLoanData(
       host.decodeCtx(_ctx).userData
    ) returns (uint256 loanOfferId, address loanTaker) {

            console.log('juppy juppy continue');

          



        uint alreadyPayed = (block.timestamp - loan.initTimestamp).mul(uint96(loan.flowRate));
        console.log(alreadyPayed);
        uint stillToPay = loan.loanTotalAmount - alreadyPayed;
        console.log(stillToPay);
            
        } catch (bytes memory /*lowLevelData*/) {
            // This is executed in case revert() was used.  
            console.log('juppy juppy error');
          loan.superToken.transfer(loan.loanProvider, loan.collateral);
            
        }


   (address loanTaker, ) = abi.decode(_agreementData, (address, address));

    // DataTypes.LoanTraded memory _loanTraded  = _loansTradedById[_loanIdByTaker[loanTaker]];
    // _loanIdByTaker[loanTaker] = 0;
 
    // uint payed = (block.timestamp -_loanTraded.initTimeStamp).mul(uint96(_loanTraded.flowRate));
    // uint total = _loanTraded.loanAmount;
    // uint tobePayed = total - payed;
  
    // console.log(payed);
    // console.log(total);
    // console.log(tobePayed);
    return _ctx;
  }


  

  function parseLoanData(bytes memory data)
    public
    pure
    returns (uint256 loanOfferId, address loanTaker)
  {
    (loanOfferId, loanTaker) = abi.decode(data, (uint256, address));
  }

  /**************************************************************************
   * INTERNAL HELPERS
   *************************************************************************/

  function _isCFAv1(address agreementClass) private view returns (bool) {
    return
      ISuperAgreement(agreementClass).agreementType() ==
      keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1");
  }
}
