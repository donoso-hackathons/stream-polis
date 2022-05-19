//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import {ISuperfluid, ISuperAgreement, ISuperToken, ISuperApp, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

import {DataTypes} from "./libraries/DataTypes.sol";
import {Events} from "./libraries/Events.sol";

import "hardhat/console.sol";

contract LendingMarketPlace is SuperAppBase {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    ISuperfluid public _host; // host
    IConstantFlowAgreementV1 public _cfa; // the stored constant flow agreement class address



    Counters.Counter public _loansOfferedCounter;
    mapping(uint256 => DataTypes.LoanOffer) _loansOfferedById;
    /// Loans offered by Provider will be queried thorugh Graph


    Counters.Counter public _loansTradedCounter;
    mapping(uint256 => DataTypes.LoanTraded) _loansTradedById;
    /// Loans offered by Provider will be queried thorugh Graph



    constructor(ISuperfluid host, IConstantFlowAgreementV1 cfa) {
        require(address(host) != address(0), "host is zero address");
        require(address(cfa) != address(0), "cfa is zero address");

        _host = host;
        _cfa = cfa;

        uint256 configWord = SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP;

        _host.registerApp(configWord);
    }

    // ============= =============  Modifiers ============= ============= //
    // #region Modidiers

    modifier onlyHost() {
        require(
            msg.sender == address(_host),
            "RedirectAll: support only one host"
        );
        _;
    }

    modifier onlyExpected(address agreementClass) {
        require(_isCFAv1(agreementClass), "RedirectAll: only CFAv1 supported");
        _;
    }

    // endregion

    // ============= =============  Public Functions ============= ============= //
    // #region Public Functions

    /**
     * @notice Allows anyone to crate a Loan Offering
     * @dev the calculation of the flowrate will happen in fronted / ui will ask about durations in days/momnths
     */
    function offerLoan(
        uint256 loanAmount,
        address superToken,
        uint256 collateralShare,
        int96 flowRate
    ) public {
        _loansOfferedCounter.increment();

        uint256 loanId = _loansOfferedCounter.current();

        DataTypes.LoanOffer memory _loan = DataTypes.LoanOffer({
            loanOfferId:loanId,
            loanAmount: loanAmount,
            superToken: superToken,
            collateralShare: collateralShare,
            flowRate: flowRate,
            loanProvider: msg.sender,
            status: DataTypes.OFFER_STATUS.LIVE
        });

        _loansOfferedById[loanId] = _loan;

        emit Events.LoanSupplyCreated(_loan);
    }

    // endregion

    /**************************************************************************
     * SuperApp callbacks
     *************************************************************************/

    struct LocalStateCallBack {
      bytes  newCtx;
      ISuperfluid.Context  decodedContext;
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
         newCtx = _ctx;
         _loansTradedCounter.increment();
        return newCtx;
    }

    function afterAgreementCreated2(
        ISuperToken _superToken,
        address _agreementClass,
        bytes32, // _agreementId,
        bytes calldata _agreementData,
        bytes calldata, // _cbdata,
        bytes calldata _ctx
    )
        external

        onlyExpected(_agreementClass)
        onlyHost
        returns (bytes memory newCtx)
    {




      LocalStateCallBack memory _localState = LocalStateCallBack({
        newCtx:_ctx,
        decodedContext:_host.decodeCtx(_ctx),
        loanOfferId:0, 
        loanDuration:0,
        loanTaker:address(0),
        inFlowRate:0,
        superToken:_superToken
      });


     //update the context with the same logic...
        // ISuperfluid.Context memory decodedContext = _host.decodeCtx(_ctx);
        (_localState.loanOfferId, _localState.loanDuration) = parseLoanData(
            _localState.decodedContext.userData
        );

        DataTypes.LoanOffer memory _loanOffer = _loansOfferedById[_localState.loanOfferId];

        require(_loanOffer.loanProvider != address(0), 'NOT_EXISTING_LOAN');
        require(ISuperToken(_loanOffer.superToken) == _superToken, 'SUPERTOKEN_NOT_MATCH');


        (_localState.loanTaker, ) = abi.decode(_agreementData, (address, address));

        // use case ony one loan per user

        // loantaker must approve the marketplace for tranfering the ERC20
        ISuperToken(_superToken).transferFrom(_localState.loanTaker, address(this), _loanOffer.loanAmount);

        (, _localState.inFlowRate, , ) = _cfa.getFlow(
            _localState.superToken,
            _localState.loanTaker,
            address(this)
        ); 


        ///Create FLOW To loanProvider
        (_localState.newCtx, ) = _host.callAgreementWithContext(
                _cfa,
                abi.encodeWithSelector(
                    _cfa.createFlow.selector,
                    _localState.superToken,
                    _loanOffer.loanProvider,
                    _localState.inFlowRate,
                    new bytes(0) // placeholder
                ),
                "0x",
                newCtx
            );


        _loansTradedCounter.increment();

        uint256 loanTradedId = _loansTradedCounter.current();

        DataTypes.LoanTraded memory _loanTraded = DataTypes.LoanTraded({
            loanTradedId: loanTradedId,
            loanOfferId: _loanOffer.loanOfferId,
            loanAmount: _loanOffer.loanAmount,
            collateralShare: _loanOffer.collateralShare,
            flowRate: _localState.inFlowRate,
            initTimeStamp: block.timestamp,
            status:  DataTypes.LOAN_STATUS.ACTIVE
        });

        _loansTradedById[loanTradedId ] = _loanTraded ;

        emit Events.LoanTradeCreated(_loanTraded);

      
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
        return _ctx;
    }


    function parseLoanData(bytes memory data)
        internal
        pure
        returns (uint256 loanOfferId, uint256 loanDuration)
    {
        (loanOfferId, loanDuration) = abi.decode(data, (uint256, uint256));

  

    }

    /**************************************************************************
     * INTERNAL HELPERS
     *************************************************************************/

    function _isCFAv1(address agreementClass) private view returns (bool) {
        return
            ISuperAgreement(agreementClass).agreementType() ==
            keccak256(
                "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
            );
    }
}
