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

contract StreamHouse is SuperAppBase {
  using SafeMath for uint256;


  ISuperfluid public _host; // host
  IConstantFlowAgreementV1 public _cfa; // the stored constant flow agreement class address



 mapping(address => uint) public shares_per_user;

 uint liquidity;
    uint K;
 



  constructor(ISuperfluid host,
    IConstantFlowAgreementV1 cfa)  {
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




  // endregion



}
