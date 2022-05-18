//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract StreamSwap is ERC20 {
  address token1;
  address token2;
  uint public ratio;
  uint constant  public DECIMALS_RATIO = 1000000;
  constructor(address _token1, address _token2) ERC20("SSW", "Stream Swap LP") {
    require(_token1 != address(0), "Token1 address passed is a null address");
    require(_token2 != address(0), "Token2 address passed is a null address");
    token1 = _token1;
    token2 = _token2;
  }

  // DEPOSIT
function addInitialLiquidity(uint _amountToken1, uint _amountToken2) public {
    ratio = _amountToken1 * DECIMALS_RATIO/(_amountToken2);
    console.log(ratio);
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
