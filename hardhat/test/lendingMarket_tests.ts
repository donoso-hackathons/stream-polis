import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { initEnv } from "../helpers/utils";
import * as hre from 'hardhat';
import { BaseProvider, TransactionReceipt } from '@ethersproject/providers';
import { LendingMarketPlace, LendingMarketPlace__factory, StreamSwap, StreamSwap__factory } from "../typechain-types";

describe("Lending market Place", function () {

  let lendMarketPlaceContract:LendingMarketPlace

   let HOST ="0xEB796bdb90fFA0f28255275e16936D25d3418603"; 
   let CFA = "0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873";

  let TOKEN1 = "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f";
  let TOKEN2  = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";

  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let provider: BaseProvider;

  beforeEach(async () => {
    [deployer, user1, user2, user3] = await initEnv(hre);

    provider =   hre.ethers.provider;

    lendMarketPlaceContract =  await new LendingMarketPlace__factory(deployer).deploy(HOST,CFA);

  })


  it.only("Should Start with zero tokens", async function () {
    expect(await lendMarketPlaceContract._loansOfferedCounter()).to.equal(0);

  });





});
