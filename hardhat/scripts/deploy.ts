// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

import { writeFileSync,readFileSync } from "fs";
import {copySync, ensureDir,existsSync } from 'fs-extra'
import { ethers,hardhatArguments } from "hardhat";
import config from "../hardhat.config";
import { join } from "path";
import { createHardhatAndFundPrivKeysFiles } from "../helpers/localAccounts";
import * as hre from 'hardhat';
import { Events__factory, LendingMarketPlace__factory, LoanFactory__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { initEnv } from "../helpers/utils";


let HOST = '0xEB796bdb90fFA0f28255275e16936D25d3418603';
let CFA = '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873';

interface ICONTRACT_DEPLOY {
  artifactsPath:string,
  name:string,
  ctor?:any,
  jsonName:string
}
let deployer: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let user3: SignerWithAddress;
const contract_path_relative = '../src/assets/contracts/';
const processDir = process.cwd()
const contract_path = join(processDir,contract_path_relative)

const eventAbi = Events__factory.abi;

ensureDir(contract_path)

async function main() {

let network = hardhatArguments.network;
if (network == undefined) {
  network = config.defaultNetwork;
}

[deployer, user1, user2, user3] = await initEnv(hre);


  const contract_config = JSON.parse(readFileSync( join(processDir,'contract.config.json'),'utf-8')) as {[key:string]: ICONTRACT_DEPLOY}
  
  const deployContracts=["loanFactory"]
 
  const loanFactory = await new LoanFactory__factory(deployer).deploy()

  let toDeployContract = contract_config['loanFactory'];
  writeFileSync(
    `${contract_path}/${toDeployContract.jsonName}_metadata.json`,
    JSON.stringify({
      abi: LoanFactory__factory.abi.concat(eventAbi),
      name: toDeployContract.name,
      address: loanFactory.address,
      network: network,
    })
  );

  writeFileSync(
    `../add-ons/subgraph/abis/${toDeployContract.jsonName}.json`,
    JSON.stringify(LoanFactory__factory.abi.concat(eventAbi))
  );

  console.log(toDeployContract.name + ' Contract Deployed to:', loanFactory.address);

  ///// copy Interfaces and create Metadata address/abi to assets folder
  copySync(`./typechain-types/${toDeployContract.name}.ts`, join(contract_path, 'interfaces', `${toDeployContract.name}.ts`));



  const lendingMarketPlace = await new LendingMarketPlace__factory(deployer).deploy(loanFactory.address,HOST,30)
  toDeployContract = contract_config['lendingMarketPlace'];
  writeFileSync(
    `${contract_path}/${toDeployContract.jsonName}_metadata.json`,
    JSON.stringify({
      abi: LendingMarketPlace__factory.abi,
      name: toDeployContract.name,
      address: lendingMarketPlace.address,
      network: network,
    })
  );

  writeFileSync(
    `../add-ons/subgraph/abis/${toDeployContract.jsonName}.json`,
    JSON.stringify(LendingMarketPlace__factory.abi)
  );
  console.log(toDeployContract.name + ' Contract Deployed to:', loanFactory.address);

  ///// create the local accounts file
  if (
    !existsSync(`${contract_path}/local_accouts.json`) &&
    (network == 'localhost' || network == 'hardhat')
  ) {
    const accounts_keys = await createHardhatAndFundPrivKeysFiles(
      hre,
      contract_path
    );
    writeFileSync(
      `${contract_path}/local_accouts.json`,
      JSON.stringify(accounts_keys)
    );
  }

 
  ///// copy addressess files
  if (!existsSync(`${contract_path}/interfaces/common.ts`)) {
    copySync(
      './typechain-types/common.ts',
      join(contract_path, 'interfaces', 'common.ts')
    );
  }


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
