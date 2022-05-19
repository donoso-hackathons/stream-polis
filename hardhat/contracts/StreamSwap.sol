//SPDX-License-Identifier: Unlicense
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import {ISuperfluid, ISuperAgreement, ISuperToken, ISuperApp, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";


import {DataTypes} from  "./libraries/DataTypes.sol";

import "hardhat/console.sol";

contract StreamSwap is SuperAppBase, ERC20 {
  using SafeMath for uint256;
  address token1;
  address token2;
  uint public ratio;
  uint constant  public DECIMALS_RATIO = 1000000;

  ISuperfluid public _host; // host
  IConstantFlowAgreementV1 public _cfa; // the stored constant flow agreement class address
  ISuperToken public _acceptedToken; // accepted token


 mapping(address => uint) public shares_per_user;

 uint liquidity;
    uint K;
 

 /// mockBalances
 uint balanceFlow1;
 uint balanceFlow2;

  constructor(address _token1, address _token2,   ISuperfluid host,
    IConstantFlowAgreementV1 cfa) ERC20("SSW", "Stream Swap LP") {
    require(_token1 != address(0), "Token1 address passed is a null address");
    require(_token2 != address(0), "Token2 address passed is a null address");
    require(address(host) != address(0), "host is zero address");
    require(address(cfa) != address(0), "cfa is zero address");
 
        token1 = _token1;
        token2 = _token2;


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
  modifier onlyPoolTokens(address _token) {
    require(_token == token1 || _token == token2,'NOT_IN_POOL');
    _;
  }



  // endregion


  // DEPOSIT
function addInitialLiquidity(uint _amountToken1, uint _amountToken2) public {
    ratio = _amountToken1 * DECIMALS_RATIO/(_amountToken2);
    balanceFlow1 = _amountToken1;
    balanceFlow2 = _amountToken2;

    /// mint tokens
    K =  _amountToken1 * _amountToken2;
    liquidity = _amountToken2;
   
   
}


function checkLiquidityToken1(uint _flow, address _token) public view  onlyPoolTokens(_token) returns(uint) {

if (_token == token1){
    return balanceFlow2.mul(_flow).div(balanceFlow1);
} 
  return balanceFlow1.mul(_flow).div(balanceFlow2);

}

function addLiquidity(uint _amount1, address _token) public  onlyPoolTokens(_token) returns(uint) {



}




  // WIDTHDRAW

  // SWAP

  // HELPERS


/**
* @dev Returns the amount of `Token1 held by the contract
*/
function getLPTokens() public view returns (uint) {


    return 2;
}


/**
* @dev Returns the amount of `Token1 held by the contract
*/
function getReserveToken1() public view returns (uint) {
    return ERC20(token1).balanceOf(address(this));
}

/**
* @dev Returns the amount of `Token1 held by the contract
*/
function getReserveToken2() public view returns (uint) {
    return ERC20(token2).balanceOf(address(this));
}

}
