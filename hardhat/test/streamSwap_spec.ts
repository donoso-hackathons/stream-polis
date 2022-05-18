import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { initEnv } from "../helpers/utils";
import * as hre from 'hardhat';
import { BaseProvider, TransactionReceipt } from '@ethersproject/providers';
import { StreamSwap, StreamSwap__factory } from "../typechain-types";

describe("Stream Swap", function () {

  let streamSwapContract:StreamSwap

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

    streamSwapContract =  await new StreamSwap__factory(deployer).deploy(TOKEN1,TOKEN2);

  })


  it("Should Start with zero tokens", async function () {
    expect(await streamSwapContract.totalSupply()).to.equal(0);

  });

  it('should add liquidity and set correct ratio', async function () {
    await streamSwapContract.addInitialLiquidity(450,300);
    let ratio =  await streamSwapContract.ratio();
    expect(ratio.toString()).to.equal("1500000")
    let decimals = await streamSwapContract.DECIMALS_RATIO();
    expect(+ratio.toString()/+decimals.toString()).to.equal(1.5)
  });

  it('should check correcty the liquidity and set correct ratio', async function () {
    await streamSwapContract.addInitialLiquidity(450,300);

    let p = await streamSwapContract.checkLiquidityToken1(300,TOKEN2)

    console.log(p.toString())

  });



});
