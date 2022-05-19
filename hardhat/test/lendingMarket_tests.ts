import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { initEnv, waitForTx } from "../helpers/utils";
import * as hre from 'hardhat';
import { BaseProvider, TransactionReceipt } from '@ethersproject/providers';
import { Events__factory, LendingMarketPlace, LendingMarketPlace__factory } from "../typechain-types";
import { LoanOfferStruct } from "../typechain-types/Events";
import { utils } from "ethers";
import { matchEvent } from "./helpers/utils";
import { Framework } from "@superfluid-finance/sdk-core";

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
let eventsLib:any;
let sf: Framework;

describe("Lending market Place", function () {



  beforeEach(async () => {
    [deployer, user1, user2, user3] = await initEnv(hre);
    provider =   hre.ethers.provider;

    lendMarketPlaceContract =  await new LendingMarketPlace__factory(deployer).deploy(HOST,CFA);

    eventsLib = await new Events__factory(deployer).deploy();


    /// Launch SF FRAMEOWRK
       //// SUPERFLUID SDK INITIALIZATION
       sf = await Framework.create({
        networkName: 'local',
        provider: provider,
        customSubgraphQueriesEndpoint: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai',
        resolverAddress: "0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3"
      });
  

  })


  it("Should Start with No offers created", async function () {
    expect(await lendMarketPlaceContract._loansOfferedCounter()).to.equal(0);

  });


  it("Should create an offer and emit event", async function () {

    //let offer:LOANOFFERSTRUCT
    // let offer:LoanOfferStruct = {
    //     superToken:TOKEN1,
    //     loanProvider:deployer,
        
    // }
    let amountLoan = +utils.parseEther("10").toString();
 
    let collateralShare = (amountLoan/10).toFixed(0)
    let durationDays = 365;
    let inflowRate = (amountLoan/(durationDays*24*60*60)).toFixed(0)

    const lendMarketPlaceContractUser1 = await LendingMarketPlace__factory.connect(lendMarketPlaceContract.address, user1);
    const receipt = await waitForTx(lendMarketPlaceContractUser1.offerLoan(amountLoan.toString(),TOKEN1,collateralShare,inflowRate))
    expect(await lendMarketPlaceContract._loansOfferedCounter()).to.equal(1);
  
    matchEvent(receipt, 'LoanSupplyCreated', eventsLib, [
      [1,
        amountLoan.toString(),
        TOKEN1,
        collateralShare,
        inflowRate,
        user1.address,
        0
      ],
    ]);


  });


  it("Should take the ", async function () {

    //let offer:LOANOFFERSTRUCT
    // let offer:LoanOfferStruct = {
    //     superToken:TOKEN1,
    //     loanProvider:deployer,
        
    // }
    let amountLoan = +utils.parseEther("10").toString();
    let collateralShare = (amountLoan/10).toFixed(0)
    let durationDays = 365;
    let inflowRate = (amountLoan/(durationDays*24*60*60)).toFixed(0)
      const lendMarketPlaceContractUser1 = await LendingMarketPlace__factory.connect(lendMarketPlaceContract.address, user1);
    await waitForTx(lendMarketPlaceContractUser1.offerLoan(amountLoan.toString(),TOKEN1,collateralShare,inflowRate))
    
 
  
   const createFlowOperation = sf.cfaV1.createFlow({flowRate:inflowRate,superToken:TOKEN1,receiver:lendMarketPlaceContract.address,userData:'0x'})
    const tx = await createFlowOperation.exec(deployer)


    expect(await lendMarketPlaceContract._loansTradedCounter()).to.equal(1);
  
    // matchEvent(receipt, 'LoanSupplyCreated', eventsLib, [
    //   [1,
    //     amountLoan.toString(),
    //     TOKEN1,
    //     collateralShare,
    //     inflowRate,
    //     deployer.address,
    //     0
    //   ],
    // ]);


  });



});



export async function  createOffer(lendMarketPlaceContract:LendingMarketPlace,TOKEN1:string){
  let amountLoan = +utils.parseEther("10").toString();
 
    let collateralShare = (amountLoan/10).toFixed(0)
    let durationDays = 365;
    let inflowRate = (amountLoan/(durationDays*24*60*60)).toFixed(0)

   
    const receipt = await waitForTx(lendMarketPlaceContract.offerLoan(amountLoan.toString(),TOKEN1,collateralShare,inflowRate))
    return receipt
}
